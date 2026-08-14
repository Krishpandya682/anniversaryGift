import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

/* ============================================================
   EmailJS Configuration
   Replace these with your values from emailjs.com
============================================================ */
/* ============================================================
   EmailJS Configuration
============================================================ */

const EMAILJS_SERVICE_ID = "service_popwzwu";
const EMAILJS_TEMPLATE_ID = "template_ljnio37";
const EMAILJS_PUBLIC_KEY = "ztKSaXyBd09tC5YgN";
/*
===================================================
   Hero Page
============================================================ */

function Hero({ onNext }) {
  return (
    <section className="page hero">
      <div className="card">
        <h1>❤️ Happy Anniversary ❤️</h1>

        <p>
          This year, I didn't want to give you something that would sit on a
          shelf.
        </p>

        <p>
          Instead, I wanted to give you something to look forward to.
        </p>

        <p>
          Tell me when you'll both be together, where you'll be, and what kind
          of experience you'd love.
        </p>

        <p>
          I'll take care of the planning.
          <br />
          You just have to enjoy it.
        </p>

        <button onClick={onNext}>Begin</button>
      </div>
    </section>
  );
}

/* ============================================================
   Letters Page
============================================================ */

function Letters({ onNext }) {
  return (
    <section className="page">
      <div className="card">
        <h2>❤️ From Mom</h2>

        <p>
          Happy Anniversary! We are so proud of both of you and wish you many
          more years filled with happiness, laughter, and unforgettable
          memories.
        </p>

        <hr />

        <h2>❤️ From Dad</h2>

        <p>
          Wishing you both a lifetime of adventures together. May every year be
          even better than the last.
        </p>

        <hr />

        <h2>❤️ From Krish</h2>

        <p>
          I wanted to do something a little different this year.
        </p>

        <p>
          Instead of trying to guess what you'd enjoy, I thought I'd let you
          choose the kind of day you'd love...
        </p>

        <p>
          Once you tell me, I'll handle everything else.
        </p>

        <button onClick={onNext}>Plan Our Day</button>
      </div>
    </section>
  );
}

/* ============================================================
   Planner Form
============================================================ */

function PlannerForm({ onSubmit }) {
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    date: "",
    location: "",
    vibe: "",
    comments: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();

    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          date: form.date,
          location: form.location,
          vibe: form.vibe,
          comments: form.comments,
        },
        EMAILJS_PUBLIC_KEY
      );

      onSubmit();
    } catch (error) {
      console.error(error);

      alert(
        "Oops! Something went wrong while sending your request."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="page">
      <div className="card form-card">
        <h2>Let's Plan Your Anniversary</h2>

        <form onSubmit={submit}>
          <label>Date You'll Be Together</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label>Where Will You Be?</label>

          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option>Seattle</option>
            <option>Raleigh</option>
            <option>Somewhere Else</option>
          </select>

          <label>What Kind Of Experience?</label>

          <select
            name="vibe"
            value={form.vibe}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option>Relax & Recharge</option>
            <option>Luxury</option>
            <option>Adventure</option>
            <option>Foodie Experience</option>
            <option>Creative</option>
            <option>Nature</option>
            <option>Surprise Us</option>
          </select>

          <label>
            Tell me a little about what you're imagining...
          </label>

          <textarea
            rows={6}
            name="comments"
            value={form.comments}
            onChange={handleChange}
            placeholder="We've always wanted to try pottery... We'd love somewhere romantic... We'd rather stay indoors..."
          />

          <button
            type="submit"
            disabled={sending}
          >
            {sending ? "Planning..." : "Submit ❤️"}
          </button>

        </form>

      </div>

    </section>
  );
}
/* ============================================================
   Success Page
============================================================ */

function Success() {
  return (
    <section className="page success">
      <div className="card">

        <h1>🎉</h1>

        <h2>You're All Set!</h2>

        <p>
          Your anniversary request has been received.
        </p>

        <p>
          Now comes my favorite part...
        </p>

        <p>
          Planning a beautiful experience just for the two of you.
        </p>

        <p>
          I'll be in touch soon with all the details.
        </p>

        <h3>
          ❤️ Happy Anniversary ❤️
        </h3>

      </div>
    </section>
  );
}


/* ============================================================
   Main App
============================================================ */

export default function App() {

  const [page, setPage] = useState(0);

  return (
    <div className="App">

      {page === 0 && (
        <Hero
          onNext={() => setPage(1)}
        />
      )}

      {page === 1 && (
        <Letters
          onNext={() => setPage(2)}
        />
      )}

      {page === 2 && (
        <PlannerForm
          onSubmit={() => setPage(3)}
        />
      )}

      {page === 3 && (
        <Success />
      )}

    </div>
  );
}




