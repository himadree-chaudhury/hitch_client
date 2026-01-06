const HowItWorks = () => {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How Hitch Works
            </h2>
            <p className="text-slate-600">
              We make it simple to bridge the gap between online discovery and
              offline connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold">Discover</h3>
              <p className="text-slate-500 leading-relaxed">
                Browse thousands of events based on your interests, location,
                and schedule.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold">Join</h3>
              <p className="text-slate-500 leading-relaxed">
                Book your spot instantly. For paid events, our secure payment
                system keeps you safe.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold">Connect</h3>
              <p className="text-slate-500 leading-relaxed">
                Show up, meet like-minded people, and enjoy the experience
                together.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
};
export default HowItWorks;