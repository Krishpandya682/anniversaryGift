import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

/* ============================================================
   EmailJS Configuration
============================================================ */

const EMAILJS_SERVICE_ID = "service_popwzwu";
const EMAILJS_TEMPLATE_ID = "template_ljnio37";
const EMAILJS_PUBLIC_KEY = "ztKSaXyBd09tC5YgN";

/* ============================================================
   Photos
============================================================ */

const photos = [
  "./images/1.JPG",
  "./images/2.JPG",
  "./images/3.JPG",
  "./images/4.JPG",
  "./images/6.JPG",
  "./images/5.JPG",
];

/* ============================================================
   Hero Page
============================================================ */

function Hero({ onNext }) {
  return (
    <section
      className="page hero"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(250,247,243,.72),
            rgba(250,247,243,.88)
          ),
          url("${photos[0]}")
        `,
      }}
    >
      <div className="card hero-card">
        <div className="eyebrow">A little something from us</div>

        <h1>❤️ Happy Anniversary ❤️</h1>

        <p>
          This year, we didn't want to give you something that would sit on a
          shelf.
        </p>

        <p>
          Instead, we wanted to give you something to look forward to.
        </p>

        <p>
          Tell me when you'll both be together, where you'll be, and what kind
          of experience you'd love.
        </p>

        <p>
          I'll take care of the planning.
          <br />
          <strong>You just have to enjoy it.</strong>
        </p>

        <button onClick={onNext}>Begin ❤️</button>
      </div>
    </section>
  );
}

/* ============================================================
   Memories Page
============================================================ */
function Memories({ onNext }) {

  // Temporary sequence using the photos we currently have.
  // Add more photos to the photos array later and we can expand this.
  const memorySequence = [
    {
      type: "photo",
      image: photos[0],
      alt: "A favorite memory",
      position: "center",
      size: "large",
    },

    {
      type: "message",
      from: "Mom",
      text: (
        <p>
          Wishing a Happy Anniversary to my daughter and son-in-law. 
          May God keep you two together forever. 
        </p>
      ),
    },

    {
      type: "photo",
      image: photos[1],
      alt: "A favorite memory",
      position: "right",
      size: "medium",
    },

    {
      type: "message",
      from: "Dad",
      text: (
        <p>
          Dear Isha and Karan, Happy 1st Anniversary to my favorite couple!
          I am so proud of the beautiful life and love you are building together. Wishing you a lifetime of endless happiness. 
          Cheers to many more memorable years ahead!
        </p>
      ),
    },

    {
      type: "photo",
      image: photos[2],
      alt: "A favorite memory",
      position: "left",
      size: "medium",
    },

    {
      type: "message",
      from: "Krish",
      text: (
        <>
          <p>
            Exactly 365 days ago, I pronounced you partners for life, and your journey officially began. 
          </p>

          <p>
            Congratulations on the first year of your marriage. 
            I can't wait to watch you tackle new milestones, chase big dreams and grow old together. 
          </p>

          <p>
            Happy anniversary, Isha and Karan. The best is truly yet to come.
          </p>
        </>
      ),
    },

    {
      type: "photo",
      image: photos[3],
      alt: "A favorite memory",
      position: "right",
      size: "large",
    },

    {
      type: "photo",
      image: photos[4],
      alt: "A favorite memory",
      position: "left",
      size: "medium",
    },

    {
      type: "photo",
      image: photos[5],
      alt: "A family memory",
      position: "center",
      size: "large",
    },
  ];

  return (
    <section className="page memories-page">

      <div className="memories-container">

        {/* Intro */}
        <div className="section-intro">

          <div className="eyebrow">
            A few memories along the way
          </div>

          <h2>
            For two people worth celebrating
          </h2>

          <p>
            Before you plan your next adventure, here's a little reminder
            of some of the adventures you've already had.
          </p>

        </div>


        {/* Memory Sequence */}
        <div className="memory-sequence">

          {memorySequence.map((item, index) => {

            if (item.type === "photo") {

              return (
                <div
                  key={index}
                  className={`single-photo photo-${item.position}`}
                >

                  <div
                    className={`photo-frame photo-${item.size}`}
                  >

                    <img
                      src={item.image}
                      alt={item.alt}
                    />

                  </div>

                </div>
              );

            }

            return (
              <div
                key={index}
                className={`letter`}
              >

                <div className="letter-label">
                  {`From ${item.from}`}
                </div>

                {item.text}

              </div>
            );

          })}

        </div>


        {/* Continue */}
        <button onClick={onNext}>
          Plan Your Day →
        </button>

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
    vibe: [],
    comments: "",
  });

   function handleChange(e) {
     const { name, value, options, multiple } = e.target;
   
     setForm({
       ...form,
       [name]: multiple
         ? Array.from(options)
             .filter((option) => option.selected)
             .map((option) => option.value)
         : value,
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
          vibe: form.vibe.join(", "),
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
    <section className="page planner-page">
      <div className="card form-card">

        <div className="eyebrow">Your turn</div>

        <h2>Let's Plan Your Anniversary</h2>

        <p className="form-intro">
          You don't need to figure out the details. Just tell me the basics
          and I'll take it from here.
        </p>

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
            <option>Somewhere Else (Mention below)</option>
          </select>

          <label>What Kind Of Experience?</label>

          <select
            name="vibe"
            value={form.vibe}
            onChange={handleChange}
            multiple
            required
          >
            <option value="">Select...</option>     
            <option>🌿 Relax & Recharge</option>
            <option>✨ Luxury & Indulgence</option>
            <option>🍷 Food & Wine</option>
            <option>🎨 Arts & Creativity</option>
            <option>🎭 Entertainment & Night Out</option>
            <option>🧗 Adventure & Adrenaline</option>
            <option>🌲 Nature & Outdoors</option>
            <option>❤️ Romantic & Intimate</option>
            <option>🧘 Wellness & Self-Care</option>
            <option>🏡 Cozy & Low-Key</option>
            <option>🗺️ Explore Somewhere New</option>
            <option>🧠 Learn Something New</option>
            <option>🎁 Surprise Us</option>
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
            {sending ? "Planning..." : "Send My Choices ❤️"}
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

        <div className="success-icon">🎉</div>

        <div className="eyebrow">And now...</div>

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
        <Memories
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
