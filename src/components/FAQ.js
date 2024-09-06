import React,{useState} from 'react'

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqData = [
      {
        question: "Why shouldn't I throw my subject notes in the dustbin?",
        answer:
          " There are several good reasons. First, your notes can be a valuable resource for future reference and studying. Second, they might be useful to others, like your siblings or friends. Third, throwing away paper notes contributes to environmental waste.",
      },
      {
        question: "What is an offline notes distribution system?",
        answer:
          "An offline notes distribution system is a platform or service that provides access to educational or informational materials in a physical format, such as printed notes or books, without requiring an internet connection.",
      },
      {
        question: "What subjects or topics do your offline notes cover?",
        answer:
          "We offer a wide range of offline notes covering various subjects and topics, from academic subjects to professional development materials.",
      },
      {
        question:
          "Can I request custom notes or materials not listed on your platform?",
        answer:
          "We do our best to accommodate custom requests. Feel free to reach out to us with your specific requirements, and we'll see if we can provide the materials you need.",
      },
      {
        question:
          "How can I get in touch with your customer support for inquiries or assistance?",
        answer:
          "You can contact our customer support team through the contact information provided on our website. We're here to help with any questions or concerns you may have.",
      },
    ];
  
    const toggleFAQ = (index) => {
      if (activeIndex === index) {
        setActiveIndex(null);
      } else {
        setActiveIndex(index);
      }
    };
  return (
    <section id="faq" className=" py-24">
    <div className="container faq shadow-inner shadow-2xl px-4 m-auto w-5/6 py-8  object-cover rounded-lg shadow-lg">
      <h1 className="heading text-3xl font-semibold mb-6">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="p-4 text-gray-500 rounded-lg text-black font-semibold"
          >
            <div
              className="flex text-gray-500 font-semibold justify-between cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-lg  font-medium">{faq.question}</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {activeIndex === index && (
              <p className="mt-2 pr-8 font-medium text-gray-500">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}
