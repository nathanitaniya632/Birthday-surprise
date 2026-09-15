import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  Heart,
  Volume2,
  VolumeX,
  Lock,
  Gift,
  Cake,
  Camera,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Music,
} from "lucide-react";

import "./App.css";

function App() {
  // =========================
  // PASSWORD
  // =========================

  const [locked, setLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  const correctPassword = "Taniya_2006";

  // =========================
  // WEBSITE STATES
  // =========================

  const [page, setPage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [candleOff, setCandleOff] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [selectedBalloon, setSelectedBalloon] = useState(null);

  // =========================
  // AUDIO
  // =========================

  const audioRef = useRef(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(
      `${process.env.PUBLIC_URL}/birthday-music.mp3.mp3`
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.75;
    audioRef.current.preload = "auto";
  }

  // =========================
  // PHOTOS
  // =========================

  const photos = [
  `${process.env.PUBLIC_URL}/photos/photo1.jpg`,
  `${process.env.PUBLIC_URL}/photos/photo2.jpg`,
  `${process.env.PUBLIC_URL}/photos/photo3.jpg`,
  `${process.env.PUBLIC_URL}/photos/photo4.jpg`,
];
  // =========================
  // UNLOCK WEBSITE + START MUSIC
  // =========================

  const unlockWebsite = async () => {
    if (password === correctPassword) {
      setWrongPassword(false);

      // IMPORTANT:
      // Play music BEFORE changing locked state.
      // This click is a real user interaction,
      // so browser allows audio playback.

      if (audioRef.current) {
        try {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 0.75;

          await audioRef.current.play();

          setPlaying(true);
        } catch (error) {
          console.log("Music could not start:", error);
          setPlaying(false);
        }
      }

      setLocked(false);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    } else {
      setWrongPassword(true);

      const card = document.querySelector(".lock-card");

      if (card) {
        card.classList.remove("shake");

        setTimeout(() => {
          card.classList.add("shake");
        }, 10);
      }
    }
  };

  // =========================
  // MUSIC PLAY / PAUSE
  // =========================

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.log("Music could not play:", error);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  // =========================
  // NEXT PAGE
  // =========================

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, 8));

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  // =========================
  // BACK
  // =========================

  const previousPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  // =========================
  // CANDLE
  // =========================

  const blowCandle = () => {
    setCandleOff(true);

    confetti({
      particleCount: 130,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  // =========================
  // YES BUTTON
  // =========================

  const handleYes = () => {
    setYesClicked(true);

    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.55 },
    });
  };

  // =========================
  // BALLOON SURPRISE
  // =========================

  const balloonClick = (number) => {
    setSelectedBalloon(number);

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  // =========================
  // LOCK SCREEN
  // =========================

  if (locked) {
    return (
      <div className="app">
        <div className="stars"></div>

        {/* SAME AUDIO ELEMENT */}
        <audio
          ref={audioRef}
         src="./birthday-music.mp3.mp3"
          loop
          preload="auto"
        />

        <div className="lock-screen">

          <div className="floating-heart heart-1">♥</div>
          <div className="floating-heart heart-2">♡</div>
          <div className="floating-heart heart-3">♥</div>
          <div className="floating-heart heart-4">♡</div>

          <div className="lock-card">

            <div className="lock-circle">
              <Lock size={38} />
            </div>

            <p className="eyebrow">
              A LITTLE SURPRISE FOR YOU ❤️
            </p>

            <h1>
              Something Special
              <br />
              Is Waiting...
            </h1>

            <p className="lock-description">
              This little world is made especially
              <br />
              for you, Yashh (Betu) 💕
            </p>

            <div className="password-box">

              <Lock size={18} />

              <input
                type="password"
                value={password}
                placeholder="Enter secret password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setWrongPassword(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    unlockWebsite();
                  }
                }}
              />

            </div>

            <button
              className="unlock-button"
              onClick={unlockWebsite}
            >
              Unlock My Surprise
              <ChevronRight size={20} />
            </button>

            {wrongPassword && (
              <p className="wrong-password">
                Wrong password 💔 Try again
              </p>
            )}

            <p className="private-text">
              🔐 Only someone special knows the password
            </p>

          </div>

        </div>
      </div>
    );
  }

  // =========================
  // MAIN WEBSITE
  // =========================

  return (
    <div className="app">

      <div className="stars"></div>

      {/* MUSIC CONTINUES AFTER UNLOCK */}
      <audio
        ref={audioRef}
        src="/birthday-music.mp3.mp3"
        loop
        preload="auto"
      />

      {/* MUSIC BUTTON */}

      <button
        className="music-button"
        onClick={toggleMusic}
        title={playing ? "Pause Music" : "Play Music"}
      >
        {playing ? (
          <Volume2 size={22} />
        ) : (
          <VolumeX size={22} />
        )}
      </button>

      {/* =========================
          PAGE 0
      ========================= */}

      {page === 0 && (
        <section className="full-screen-section intro-section">

          <div className="sparkle">✦</div>

          <p className="eyebrow">
            A LITTLE SOMETHING FOR YOU ❤️
          </p>

          <h1 className="main-title">
            Happy Birthday,
            <br />
            Yashh (Betu) ❤️
          </h1>

          <p className="sub-title">
            I made something special for my favourite person.
          </p>

          <div className="gift-box">
            <Gift size={80} strokeWidth={1.5} />
          </div>

          <button
            className="main-button"
            onClick={nextPage}
          >
            Open Your Surprise
            <ChevronRight size={21} />
          </button>

        </section>
      )}

      {/* =========================
          PAGE 1 - ROSE
      ========================= */}

      {page === 1 && (
        <section className="full-screen-section">

          <p className="eyebrow">
            A LITTLE SOMETHING FOR YOU ❤️
          </p>

          <h1 className="section-title">
            Your Rose Bouquet
          </h1>

          <div className="big-rose">
            🌹
          </div>

          <p className="section-text">
            Because you deserve something beautiful.
          </p>

          <div className="memory-small">
            <img
              src={photos[0]}
              alt="Memory"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <p className="small-message">
            A little rose for my favourite person. ❤️
          </p>

          <button
            className="round-button"
            onClick={nextPage}
          >
            ❤️
          </button>

        </section>
      )}

      {/* =========================
          PAGE 2 - CAKE
      ========================= */}

      {page === 2 && (
        <section className="full-screen-section">

          <p className="eyebrow">
            MAKE A WISH ✨
          </p>

          <h1 className="section-title">
            Blow the Candle
          </h1>

          <div className="cake-area">

            <div className="cake">
              🎂
            </div>

            {!candleOff && (
              <div className="flame">
                🔥
              </div>
            )}

          </div>

          <p className="section-text">
            {candleOff
              ? "Wish made! ❤️"
              : "Make a wish and blow the candle!"}
          </p>

          {!candleOff ? (
            <button
              className="main-button"
              onClick={blowCandle}
            >
              🎤 Blow the Candle
            </button>
          ) : (
            <button
              className="main-button"
              onClick={nextPage}
            >
              Continue
              <ChevronRight size={20} />
            </button>
          )}

        </section>
      )}

      {/* =========================
          PAGE 3 - BIRTHDAY QUESTION
      ========================= */}

      {page === 3 && (
        <section className="full-screen-section">

          <div className="cute-characters">
            🧸 🎂 🐰
          </div>

          <p className="eyebrow">
            ONE LITTLE QUESTION 💕
          </p>

          <h1 className="section-title">
            Happy Birthday,
            <br />
            Yashh (Betu) ❤️
          </h1>

          <p className="section-text">
            Are you excited for what's next?
          </p>

          {!yesClicked ? (
            <div className="yes-no-buttons">

              <button
                className="yes-button"
                onClick={handleYes}
              >
                Yes ❤️
              </button>

              <button
                className="no-button"
                onClick={() => {
                  alert("No option allowed today 😌❤️");
                }}
              >
                No 🙈
              </button>

            </div>
          ) : (
            <>
              <div className="love-pop">
                I knew it! 🥹❤️
              </div>

              <button
                className="main-button"
                onClick={nextPage}
              >
                Continue
                <ChevronRight size={20} />
              </button>
            </>
          )}

        </section>
      )}

      {/* =========================
          PAGE 4 - LOVE
      ========================= */}

      {page === 4 && (
        <section className="full-screen-section love-section">

          <div className="giant-heart">
            ❤️
          </div>

          <h1 className="section-title">
            Lots of Love
            <br />
            For You ❤️
          </h1>

          <p className="section-text">
            Today is all about celebrating
            <br />
            the amazing person you are.
          </p>

          <button
            className="main-button"
            onClick={nextPage}
          >
            I Have Something More
            <ChevronRight size={20} />
          </button>

        </section>
      )}

      {/* =========================
          PAGE 5 - MESSAGE
      ========================= */}

      {page === 5 && (
        <section className="full-screen-section message-page">

          <p className="eyebrow">
            A MESSAGE FROM MY HEART ❤️
          </p>

          <h1 className="section-title">
            For Yashh (Betu)
          </h1>

          <div className="letter-card">

            <p>
              Dear Yashh (Betu), ❤️
            </p>

            <p>
              Happy Birthday to the most special person
              in my life. 🥹❤️
            </p>

            <p>
              I don't know if words can ever properly explain
              how important you are to me, but today I want
              to try.
            </p>

            <p>
              You are not just my boyfriend, you are also
              someone who has become such an important part
              of my life. You are my favourite person,
              my comfort, my happiness and someone with
              whom I love sharing all the little moments
              of my life. ❤️
            </p>

            <p>
              Thank you for coming into my life and making
              so many ordinary days feel special.
              Thank you for listening to me, understanding me,
              supporting me and for being there whenever
              I need you.
            </p>

            <p>
              Thank you for all the smiles, all the memories,
              all the silly conversations, all the little
              fights, all the care and all the love.
              Every little thing means more to me than
              you probably realise. 🫶
            </p>

            <p>
              I am genuinely thankful to have you in my life.
              No matter how busy life becomes or how many
              things change around us, I hope we always
              keep this beautiful bond between us.
            </p>

            <p>
              I hope this new year of your life brings you
              lots of happiness, success, peace and everything
              your heart wishes for.
            </p>

            <p>
              Keep smiling, keep believing in yourself and
              never forget how loved and special you are. ❤️
            </p>

            <p>
              And yes... this little birthday surprise is
              just my tiny way of saying:
            </p>

            <h2>
              "Thank you for being mine." ❤️
            </h2>

            <p>
              I love you more than I can put into words.
              Here's to many more birthdays, memories,
              adventures and beautiful moments together. 🥹❤️
            </p>

            <p className="signature">
              Forever yours,
              <br />
              Taniya ❤️
            </p>

          </div>

          <button
            className="main-button"
            onClick={nextPage}
          >
            One More Surprise
            <ChevronRight size={20} />
          </button>

        </section>
      )}

      {/* =========================
          PAGE 6 - PHOTOS
      ========================= */}

      {page === 6 && (
        <section className="full-screen-section memories-section">

          <p className="eyebrow">
            OUR LITTLE MEMORIES 📸
          </p>

          <h1 className="section-title">
            Some moments with
            <br />
            Yashh (Betu) ❤️
          </h1>

          <div className="photo-grid">

            {photos.map((photo, index) => (
              <div
                className="photo-card"
                key={photo}
              >
                <img
                  src={photo}
                  alt={`Our memory ${index + 1}`}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/500x650/24102e/ffffff?text=Add+Photo";
                  }}
                />

                <div className="photo-number">
                  {index + 1}
                </div>
              </div>
            ))}

          </div>

          <p className="photo-caption">
            Every picture has a memory,
            <br />
            and every memory has you. ❤️
          </p>

          <button
            className="main-button"
            onClick={nextPage}
          >
            Continue
            <ChevronRight size={20} />
          </button>

        </section>
      )}

      {/* =========================
          PAGE 7 - BALLOON SURPRISE
      ========================= */}

      {page === 7 && (
        <section className="full-screen-section balloon-section">

          <p className="eyebrow">
            ONE LAST THING 🎈
          </p>

          <h1 className="section-title">
            Choose a Balloon
          </h1>

          <p className="section-text">
            Each balloon has a little surprise for you. ❤️
          </p>

          <div className="balloons">

            <button
              className="balloon balloon-one"
              onClick={() => balloonClick(1)}
            >
              🎈
            </button>

            <button
              className="balloon balloon-two"
              onClick={() => balloonClick(2)}
            >
              🎈
            </button>

            <button
              className="balloon balloon-three"
              onClick={() => balloonClick(3)}
            >
              🎈
            </button>

          </div>

          {selectedBalloon && (
            <div className="surprise-popup">

              <button
                className="close-popup"
                onClick={() => setSelectedBalloon(null)}
              >
                ×
              </button>

              {selectedBalloon === 1 && (
                <>
                  <Sparkles size={35} />
                  <h2>A Little Reminder ❤️</h2>
                  <p>
                    You are much more special to me
                    than you probably realise.
                  </p>
                </>
              )}

              {selectedBalloon === 2 && (
                <>
                  <Heart size={35} fill="currentColor" />
                  <h2>My Favourite Person 🥹</h2>
                  <p>
                    If I could give you one thing today,
                    it would be the ability to see yourself
                    through my eyes.
                  </p>
                </>
              )}

              {selectedBalloon === 3 && (
                <>
                  <Gift size={35} />
                  <h2>Your Final Surprise 🎁</h2>
                  <p>
                    No matter where life takes us,
                    I hope we always create beautiful
                    memories together. ❤️
                  </p>
                </>
              )}

            </div>
          )}

          <button
            className="main-button"
            onClick={nextPage}
          >
            Final Surprise
            <ChevronRight size={20} />
          </button>

        </section>
      )}

      {/* =========================
          PAGE 8 - FINAL
      ========================= */}

      {page === 8 && (
        <section className="full-screen-section final-section">

          <div className="final-hearts">
            ❤️ 💕 ❤️
          </div>

          <p className="eyebrow">
            MADE WITH LOVE
          </p>

          <h1 className="final-title">
            Happy Birthday
            <br />
            Yashh (Betu) ❤️
          </h1>

          <p className="final-message">
            Thank you for being a beautiful part
            <br />
            of my life.
          </p>

          <div className="final-heart">
            ❤️
          </div>

          <p className="forever">
            Always & Forever 🫶
          </p>

          <button
            className="restart-button"
            onClick={async () => {
              setPage(0);

              if (audioRef.current) {
                try {
                  audioRef.current.currentTime = 0;
                  await audioRef.current.play();
                  setPlaying(true);
                } catch (error) {
                  console.log(error);
                }
              }

              confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.5 },
              });
            }}
          >
            Watch Again ❤️
          </button>

        </section>
      )}

      {/* BACK BUTTON */}

      {page > 0 && (
        <button
          className="back-button"
          onClick={previousPage}
        >
          <ArrowLeft size={20} />
        </button>
      )}

    </div>
  );
}


export default App;