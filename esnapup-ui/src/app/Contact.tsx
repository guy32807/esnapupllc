import Navigation from "../components/Navigation";
import Head from "next/head";

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact Us - eSnapUp LLC</title>
        <meta
          name="description"
          content="Get in touch with eSnapUp LLC for software development and digital marketing services."
        />
        <meta name="keywords" content="eSnapUp, contact us, software company, digital marketing" />
        <meta property="og:title" content="Contact Us - eSnapUp LLC" />
        <meta
          property="og:description"
          content="Get in touch with eSnapUp LLC for software development and digital marketing services."
        />
        <meta property="og:image" content="/contact-us.jpg" />
        <meta property="og:url" content="https://esnapup.com/contact-us" />
      </Head>
      <Navigation />
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg">
          We'd love to hear from you! Reach out to us for any inquiries or collaborations.
        </p>
        <form
          className="mt-8 max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for reaching out! We'll get back to you soon.");
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 mb-4 border rounded"
            rows={4}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}