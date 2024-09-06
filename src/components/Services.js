import React from 'react'

export default function Services() {

    const services = [
        {
          title: "Quality Notes",
          description:
            "We collaborate with top educators and subject experts to curate high-quality study materials that cover a wide range of topics and subjects.",
        },
        {
          title: "Convenience",
          description:
            "Say goodbye to the stress of downloading, printing, or worrying about a weak Wi-Fi signal. With our offline notes, your study materials are always within arms reach.",
        },
        {
          title: "Responsibility",
          description:
            "We are committed to sustainability. By distributing notes, we reduce the environmental impact associated with excessive paper waste.",
        },
      ];
    
  return (
    <section className="py-16">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl serviceHead font-extrabold mb-8">
        Our Services
      </h2>
      <div className="grid  grid-cols-1 mx-8 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className=" p-14 gridingness sm:mx-4 rounded-lg shadow-md transition ease-in-out delay-170 backcolor hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            <h1 className="text-xl headingService font-semibold mb-4">{service.title}</h1>
            <p className=" text-justify pofService">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}
