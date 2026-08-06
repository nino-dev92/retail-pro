import Header from "../components/Header";
import Footer from "../components/Footer";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { MdOutlineInventory, MdOutlineDashboard } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="p-2 text-center min-h-screen">
        {/* Hero Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container-high border border-outline-variant">
              <span
                className="material-symbols-outlined text-primary text-sm"
                data-icon="rocket_launch"
              >
                <HiOutlineRocketLaunch />
              </span>
              <span className="font-label-sm text-sm text-primary uppercase">
                New Release V2.0
              </span>
            </div>
            <h1 className="font-display-lg text-6xl text-on-surface md:pr-12">
              Streamline Your Office Sales &amp; Inventory
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant md:pr-12">
              The all-in-one management system for modern retail offices. Track
              every sale, manage stock in real-time, and grow your business with
              precision.
            </p>
            <div className="pt-4 flex justify-center sm:flex-row gap-4">
              <Link
                to="/signup"
                className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded cursor-pointer hover:bg-primary-container active:scale-95 transition-colors w-full sm:w-auto text-center"
              >
                Get Started for Free
              </Link>
            </div>
          </div>
          <div className="md:col-span-6 relative h-96 rounded-xl border border-outline-variant bg-surface-container-lowest overflow-hidden flex items-center justify-center">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
              data-alt="A clean, highly organized, and modern retail office environment. The scene is brightly lit with high-key lighting, emphasizing a professional, corporate modern aesthetic. A sleek dual-monitor setup displays sophisticated data dashboards with a crisp white and deep blue color scheme. The atmosphere is dependable, precise, and highly efficient."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPhM0gkJx8CaD-scpckO-aHOGiQJ_dDganLO7bo0-YVq2UaoocQVGExWKL92Vbab6bOaUQ_oAH-gwGNyQvB-3rqgOhfVobLqKy0hUnMmIePKjEYV_W9BmaW_tYFoL21zBz9thKjP6qck7eDHFI7n0Zm2pKN9Rwg7JkG4amW9phLplTlZTDB_6b5MyWCc7qQf7ZJogrIM6Rr8QNBkreuDRB0OeOJF2buFXzPbGfKzDpQP49Lo1U53k"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-surface/80 to-transparent"></div>
            {/* <!-- Floating UI Element Mockup --> */}
            <div className="relative z-10 bg-surface-container-lowest border border-outline-variant rounded p-4 shadow-sm w-64 transform rotate-2">
              <div className="flex items-center gap-2 mb-3 border-b border-outline-variant pb-2">
                <span
                  className="material-symbols-outlined text-primary"
                  data-icon="monitoring"
                >
                  monitoring
                </span>
                <span className="font-label-md text-label-md">Daily Sales</span>
              </div>
              <div className="font-headline-md text-headline-md text-on-surface mb-1">
                $12,450.00
              </div>
              <div className="font-label-sm text-label-sm text-tertiary-container bg-tertiary-fixed px-2 py-1 inline-block rounded">
                +14% vs Last Week
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Feature Section --> */}
        <section
          className="py-24 bg-surface-container-low border-t border-outline-variant"
          id="features"
        >
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-headline-lg text-5xl text-headline-lg mb-4 text-on-surface">
                Engineered for Precision
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Powerful tools designed to maintain order in data-heavy
                environments without cognitive fatigue.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* <!-- Card 1 --> */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded p-6 hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded mb-4 group-hover:bg-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-primary">
                    <MdOutlineInventory />
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                  Real-time Inventory Tracking
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  Monitor stock levels across multiple warehouses instantly. Get
                  automated alerts before you run out of key items.
                </p>
                <div className="mt-auto border-t border-outline-variant pt-4">
                  <span className="font-label-sm text-label-sm text-primary uppercase">
                    SKU Management Active
                  </span>
                </div>
              </div>

              {/* <!-- Card 2 --> */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded p-6 hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded mb-4 group-hover:bg-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-primary">
                    <FcStatistics />
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                  Advanced Sales Analytics
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  Generate comprehensive reports on sales trends, employee
                  performance, and seasonal demands with a single click.
                </p>
                <div className="mt-auto border-t border-outline-variant pt-4">
                  <span className="font-label-sm text-label-sm text-primary uppercase">
                    Data Export Ready
                  </span>
                </div>
              </div>

              {/* <!-- Card 3 --> */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded p-6 hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded mb-4 group-hover:bg-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-primary">
                    <MdOutlineDashboard />
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                  Multi-location Management
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  Control all your physical stores and digital fronts from a
                  centralized, unified dashboard. Sync data seamlessly.
                </p>
                <div className="mt-auto border-t border-outline-variant pt-4">
                  <span className="font-label-sm text-label-sm text-primary uppercase">
                    Global Sync Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- How it Works Section --> */}
        <section className="py-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="text-4xl mb-12 text-center text-on-surface">
            3 Steps to Optimization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* <!-- Connecting line for desktop --> */}
            <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-px bg-outline-variant z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md mb-6 border-4 border-background">
                1
              </div>
              <h4 className="text-xl font-bold mb-2 text-on-surface">
                Sign Up
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Sign up to the platform to start your journey.
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md mb-6 border-4 border-background">
                2
              </div>
              <h4 className="text-xl font-bold mb-2 text-on-surface">
                Add Products
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Define your products, current inventory and suppliers.
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md mb-6 border-4 border-background">
                3
              </div>
              <h4 className="text-xl font-bold mb-2 text-on-surface">
                Start Tracking
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Begin processing sales and watch your inventory update in
                absolute real-time.
              </p>
            </div>
          </div>
        </section>

        {/* <!-- CTA Section --> */}
        <section className="py-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-primary-container rounded-xl p-12 text-center border border-outline-variant">
            <h2 className="text-3xl mb-4 text-on-primary-container">
              Ready to optimize your office?
            </h2>
            <p className="font-body-md text-body-md text-on-primary-container mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of businesses managing their inventory with
              professional-grade precision.
            </p>
            <Link
              to="/signup"
              className="bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded cursor-pointer hover:bg-surface-tint transition-colors shadow-sm border border-primary"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
