import CarouselHome from "@/components/home/CarouselHome";
export default function Home() {
  return (
    <div className="flex flex-col bg-muted/20 min-h-[calc(100vh-4.3rem-5.8rem)]">
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12  ">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Masked Feedback - Where your identity remains a secret.
          </p>
        </section>
        {/* Carousel for Messages */}
        <CarouselHome />
      </main>
    </div>
  );
}
