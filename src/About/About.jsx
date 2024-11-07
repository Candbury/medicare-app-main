import aboutImg from "../assets/images/about.png";
import aboutCardImg from "../assets/images/about-card.png";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <secction>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          <div className="relative w-3/4 lg:2-1/2 xl:w-[700px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h1 className="heading">Proud to be one of the nations best</h1>
            <p className="text_para">
            We believe that healthcare is not just a service; it's a partnership.
             Our commitment to excellence extends to every aspect of your health,
              and we are proud to be your trusted ally in navigating the complexities of Medicare.
            </p>
            <p className="text_para mt-[30px]">
            We believe that your health should be a source of empowerment, not confusion.
             Our commitment to Medicare excellence extends beyond medical services—it's about
              providing you with the knowledge and tools to make informed decisions about your health.
            </p>
            <Link to="/">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </secction>
  );
};

export default About;
