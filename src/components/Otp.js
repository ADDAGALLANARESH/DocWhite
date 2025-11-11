import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Otp = ({ mobile, otpToken, doctorId }) => {
  const [otp, setOtp] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ✅ Image Slider */
  const images = [
    "/slide1-28ef5fa6.png",
    "/slide2-07af1764.png",
    "/slide3-41cdd860.png"
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  /* ✅ Auto focus OTP input */
  useEffect(() => {
    const otpInput = document.getElementById("otp-input");
    otpInput?.focus();
  }, []);

  /* ✅ RESEND TIMER */
  const [timer, setTimer] = useState(25);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  /* ✅ RESEND HANDLER */
  const handleResend = (type) => {
    alert(`OTP resent via ${type.toUpperCase()}`);
    setTimer(25);
    setCanResend(false);
  };

  /* ✅ VERIFY OTP HANDLER */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError1("");
    setError2("");

    const cleanedOtp = otp.trim();

    if (!cleanedOtp) {
      setError1("Enter OTP");
      return;
    }

    if (!/^\d{4,6}$/.test(cleanedOtp)) {
      setError1("OTP should be 4–6 digits");
      return;
    }
console.log(mobile)
    console.log(otpToken)
    console.log(doctorId)

    if (!mobile || !otpToken || !doctorId) {
      setError2("Missing data. Cannot verify OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://svcdev.whitecoats.com/WhiteCoatsCore/doctor/verifyOTP",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorId,
            countryCode: 91,
            mobileNo: Number(mobile),
            otp: Number(cleanedOtp),  // ✅ Always send entered OTP
            otpToken,
          }),
        }
      );

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      const status = data?.serviceResponse?.status;
      const message = data?.serviceResponse?.message;
      const doctorInfo = data?.doctor?.[0];

      if (status === "Y" && doctorInfo) {
        const { sessionToken, doctorId, firstName, lastName } = doctorInfo;

        if (sessionToken) localStorage.setItem("sessionToken", sessionToken);
        if (doctorId) localStorage.setItem("doctorId", doctorId);
        if (firstName) localStorage.setItem("firstName", firstName);
        if (lastName) localStorage.setItem("lastName", lastName);


        console.log(firstName);
        console.log(lastName);

        navigate("/dashboard", { replace: true });
      } else {
        setError2(message || "Invalid OTP");
      }
    } catch (err) {
      setError2("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      {/* ✅ HEADER */}
      <header className="navbar">
        <img src="/header-logo.svg" className="nav-logo" alt="logo" />

        <nav className="nav-right">
          <a href="###">About Us</a>
          <a href="###">Faculty</a>
          <a href="###">Plans</a>
          <a href="###">Contact Us</a>
        </nav>
      </header>

      {/* ✅ HERO SECTION (Same as LOGIN) */}
      <section className="hero-section">

        {/* ✅ LEFT SIDE (Same as login page) */}
        <div className="left-side">
          <div className="left-inner">

            <div className="dots">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={current === i ? "dot active" : "dot"}
                ></span>
              ))}
            </div>

            <p className="hero-heading">
              Learn, revise and excel – the ultimate learning platform for<br />
              your medical journey
            </p>

            <img
              src={images[current]}
              className="hero-illustration"
              alt="illustration"
            />
          </div>
        </div>

        {/* ✅ RIGHT SIDE (OTP CARD) */}
        <div className="right-side">
          <div className="login-card">
            <h3>Enter OTP</h3>

            <form onSubmit={handleSubmit}>

              {/* ✅ OTP INPUT */}
              <input
                id="otp-input"
                type="tel"
                inputMode="numeric"
                placeholder="Enter 4 digit OTP"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input1"
              />

              {error1 && <p className="error-text">{error1}</p>}
              {error2 && <p className="error-text">{error2}</p>}

              {/* ✅ RESEND AREA ABOVE VERIFY BUTTON */}
              <div className="resend-area">

                {!canResend ? (
                  <p className="resend-timer">
                    Didn’t receive OTP? Resend in {timer}s
                  </p>
                ) : (
                  <>
                    <p className="resend-ready">Didn’t receive OTP? Resend now:</p>

                    <div className="resend-buttons">
                      <button
                        type="button"
                        className="resend-btn sms-btn"
                        onClick={() => handleResend("sms")}
                      >
                        🔁 Resend SMS
                      </button>

                      <button
                        type="button"
                        className="resend-btn whatsapp-btn"
                        onClick={() => handleResend("whatsapp")}
                      >
                        💬 WhatsApp
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* ✅ VERIFY BUTTON */}
              <button disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              {loading && <div className="spinner" />}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Otp;
