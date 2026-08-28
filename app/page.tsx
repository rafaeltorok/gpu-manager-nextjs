export default function Home() {
  return (
    <div className="mx-auto text-center">
      <h1 className="text-2xl font-bold p-10">GPU Manager</h1>
      <div>
        <section className="w-[80%] min-w-[300px] max-w-[400px] mx-auto">
          Full-stack Next.js + MongoDB web application
          <p className="font-bold text-left mt-6">Features:</p>
          <ul className="list-disc mx-auto text-left">
            <li>Add your favorite graphics cards to the list</li>
            <li>Edit and remove any card you want</li>
            <li>
              Calculate the Theoretical performance for any modern graphics card
            </li>
            <li>
              Capable of measuring the FP32(float), Texture rate, Pixel rate and
              Memory bandwidth performances
            </li>
          </ul>
        </section>

        <br />

        <em className="text-gray-500">Developed by Rafael G. Torok. 2026.</em>
      </div>
    </div>
  );
}
