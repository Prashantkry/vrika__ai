import { girl, nature, w2 } from "../style/media";

const AboutPage = () => {
  return (
    <>
      <section className="overflow-hidden pt-20 h-full pb-12 lg:pt-[70px] lg:pb-[90px] bg-gradient-to-b from-black to-purple-900 dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img src={w2} alt="" className="w-full rounded-2xl" />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img src={girl} alt="" className="w-full rounded-2xl" />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img src={nature} alt="" className="w-full rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 WhyChooseUs font-bold tracking-wide text-lg underline underline-offset-8 text-[#ffffff]">
                  Why Choose Us
                </span>
                <h2 className="mb-5 text-3xl font-bold text-indigo-400 sm:text-[40px]/[48px]">
                  Next generations AI platform for Designer and architecture.
                </h2>
                <p className="mb-5 text-base text-body-color text-gray-200">
                  The company specializes in generating architectural images
                  from 3D models, incorporating images and prompts to create
                  visually stunning representations of proposed designs. Using
                  advanced rendering software and techniques, they transform
                  architectural concepts into photorealistic images that
                  accurately depict the final product. By blending 3D modeling
                  with images and text overlays, they provide clients with
                  compelling visualizations that showcase the aesthetic and
                  functional aspects of their projects. This approach allows
                  stakeholders to better understand and visualize the proposed
                  designs, facilitating decision-making and communication
                  throughout the architectural process.
                </p>
                <p className="mb-8 text-base text-body-color text-indigo-500">
                  With a focus on precision and creativity, the company delivers
                  high-quality architectural images that exceed client
                  expectations and bring designs to life..
                </p>
                <a
                  href="javascript:void(0)"
                  className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-gray-200 border-2 border-indigo-800 rounded-md px-7 bg-primary hover:bg-opacity-90"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;