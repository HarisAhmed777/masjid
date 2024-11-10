import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/Usercontext';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import phoneimg from '../assets/images/phoneimg.png';
import firstimg from '../assets/images/3in1image1.png';
import secondimg from '../assets/images/3in1image2.png'; 
import thirdmg from '../assets/images/3in1image3.png'; 
import flow from '../assets/images/flow.png'; 
import ipadpng from '../assets/images/ipadpng.png'; 
import loud from '../assets/images/loud.png'; 
import Benefit from '../components/Header/benefit';
import { Clock } from 'lucide-react';
import { SmartphoneCharging } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Maximize } from 'lucide-react';
import { Pause } from 'lucide-react';
import { TabletSmartphone } from 'lucide-react';
import Footer from '../components/Footer';



function HomePage() {
  const { user } = useContext(UserContext);
  const [countries, setCountries] = useState(0);
  const [states, setStates] = useState(0);
  const [cities, setCities] = useState(0);

  const sectionRef = useRef(null); // Reference to the section
  const hasAnimated = useRef(false); // Prevent re-animation when scrolling back

  useEffect(() => {
    if (user.email) {
      console.log('User email:', user.email);
    } else {
      console.log('User email is not set yet');
    }
    console.log(user);
  }, [user]);

  useEffect(() => {
    // Intersection Observer to check if section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          startCounting();
          hasAnimated.current = true;
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  // Counter animation logic
  const startCounting = () => {
    incrementCount(setCountries, 2000);
    incrementCount(setStates, 490);
    incrementCount(setCities, 190);
  };

  const incrementCount = (setter, target) => {
    let count = 0;
    const duration = 2000; // 2 seconds for the count animation
    const interval = Math.ceil((duration / target) * 10);

    const timer = setInterval(() => {
      count += 10; // Increase in smaller increments
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      setter(count);
    }, interval);
  };

  if (!user.email) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className='pt-14'>
        <div className='bg-bannerimg h-[80vh] text-white flex items-center '>
            <div className=' md:ms-8 md:contt'>
            <h4 className=' text-3xl mb-1'>My Masjid</h4>
            <h4 className='text-2xl mb-2'>Grow Community of your masjid by new Technologys</h4>
            <div className='mt-4'>
                <button className='bg-green-600 px-10 py-2 rounded-full me-2 '>Register your masjid now</button>
                <button className='mt-4 bg-blue-400 px-14 py-2 rounded-full me-2'>Select Masjid</button>
            </div>
            </div>
        </div>
      </div>
      <div ref={sectionRef}>
        <h4 className='text-4xl text-center mt-3'> Trusted By</h4>
        <div className='items-center  flex-col flex justify-center md:flex-row mt-4 md:gap-9 '>
          <div className='bg-[#F7F7F7] mb-6 md:me-2 text-center w-[250px] h-[200px]'>
            <div className='flex items-center justify-center h-full'>
              <h2 className='text-3xl font-[52px] font-sans'>{countries} +<p>countries</p></h2>
            </div>
          </div>
          <div className='bg-[#F7F7F7] mb-6 md:me-2 text-center  w-[250px] h-[200px]    '>
            <div className='flex items-center justify-center h-full'>
              <h2 className='text-3xl font-[52px] font-sans'>{states} + <p>states</p></h2>
            </div>
          </div>
          <div className='bg-[#F7F7F7] mb-6 md:me-2 text-center w-[250px] h-[200px]'>
            <div className='flex items-center justify-center h-full'>
              <h2 className='text-3xl font-[52px] font-sans'>{cities} +<p>cities</p></h2>
            </div>
          </div>
        </div>
      </div>
      <div className='place-items-center  grid grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1'>
      <div className='ml-8 md:ml-28'>
        <h2 className='font-bold text-4xl'>Salah times and messages <span className='block'>to the community</span></h2>
        <p className='mt-5'>With My-Masjid your masjid is able to manage messages to the community and your masjid’s exact Adhan and Iqamah timings. The timings and messages are available on both mobile phones and on large screens in the masjid. My-masjid is free of cost. Register your masjid and get started today!</p>
      </div>
      <img src={phoneimg} alt="" className='h-[300px]'/>
      </div>
      <div className='mt-10'>
        <h2 className='text-3xl text-center'>3 in 1 </h2>
        <p className='text-xl text-center'>My-Masjid gives you 3 modes to show <span className='font-bold'>timings</span> and <span className='font-bold'>messages</span> on each <span className='block'>large screen in your masjid.
      </span></p>
      </div>
      <div className='ms:10 md:contt'>
      <div className='md:grid md:grid-cols-3 gap-x-10 gap-y-10'>
        <div >
          <img src={firstimg} alt="" className='ms-10' />
          <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quasi ab voluptatibus adipisci ad odit similique et fuga tenetur autem nisi nemo, libero placeat amet minus! Accusantium nemo aliquid facilis.</p>
        </div>
        <div>
          <img src={secondimg} alt="" className='ms-10' />
          <p className='p-4'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quasi ab voluptatibus adipisci ad odit similique et fuga tenetur autem nisi nemo, libero placeat amet minus! Accusantium nemo aliquid facilis.</p>
          <p className='col-start-2 p-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam eveniet ad sit fuga nostrum, ab soluta optio alias maiores iusto officia animi nulla consequatur assumenda magni? Non corporis numquam exercitationem!</p>
        </div>
        <div>
          <img src={thirdmg} alt=""  className='ms-10'/>
          <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quasi ab voluptatibus adipisci ad odit similique et fuga tenetur autem nisi nemo, libero placeat amet minus! Accusantium nemo aliquid facilis.</p>
        </div>
      
      </div>
      
      </div>
      <div className='bg-[#f5f5f5]'>
      <div className='smallcontt md:contt py-5 mt-10  md:grid grid-cols-2 md:me-[40px] lg:me-0'>
        <div className='mt-10'>
        <h2 className='text-4xl'>Large info Screen</h2>
        <p className='mt-4'>My-Masjid is the Large Screen Display solution for your Masjid to display and track the daily salah times on the Masjid premises and on mobile phones. Once loaded in the browser it can work offline without need of an internet connection!</p>
        </div>
        <img src={flow} alt="" className='mt-4' />
      </div>
      </div>
      <div className='smallcontt md:contt py-5 mt-10  md:grid grid-cols-2  md:me-[40px] lg:me-0'>
        <div className='mt-10 order-last'>
        <h2 className='text-4xl'>Arrive on Time</h2>
        <p className='mt-4'>A difference of only 5 minutes can make or break your jamaah attendance. Some times they stand earlier some times later. Now your masjid community – and anyone in the world – can follow the exact time for Adhan and Iqamah from home or on the road from mobile devices. This motivates more people to join the masjid right on time.
        <span className='block mt-4'>You or the Muazzin don’t have to look at the screen. At each Adhan and Iqamah a buzz sound is played. Nobody will be in doubt that the time of Adhan or Iqamah has started.</span>
        <span className='block mt-4'>Now you will be right on time for every salah in your masjid إن شاء الله!</span></p>
        </div>
        <img src={ipadpng} alt="" className='mt-4' />
      </div>
      <div className='bg-[#f5f5f5]'>
      <div className='smallcontt md:contt py-5 mt-10  md:grid grid-cols-2 md:me-[40px] lg:me-0'>
        <div className='mt-10'>
        <h2 className='text-4xl'>Large info Screen</h2>
        <p className='mt-4'>The system plays three discreet sounds, so that you don’t even have to look at the screen to know the event related to Salah.
        <span className='block mt-4 '>The final warning buzz to turn off mobile phones is played 45 sec prior to Iqamah and has two purposes. To remind turning off the mobile phone and to advice the people in sunnah prayers to finish their sunnah in 45 sec as the Jamaah will stand soon. We don’t play the Adhan or Iqamah as it is the duty of the Muazzin and it carries high reward to call the Adhan and Iqamah.</span></p>
        </div>
        <img src={loud} alt="" className='mt-4' />
      </div>
      </div>
      <div className='bg-[#f5f5f5] mb-5'>
      <div className='smallcontt  mt-10 md:contt  '>
        <h2 className='text-center text-4xl pt-5'>Features</h2>
        <p className='mt-3 text-center text-2xl mb-4'>Some of the benefits</p>
        <div className='ms-4 pb-10 mb-10 md:grid grid-cols-3 gap-6'>
        <Benefit Comp ={Clock} heading='Masjid Tiiming' 
        para ='Fully customized timings according to your masjid.' />
        <Benefit Comp ={SmartphoneCharging} heading='Power Saving' 
        para ='Sensor turns off TV for power saving and longer life.' />
        <Benefit Comp ={MessageCircle} heading='Meaage to community' 
        para ='Show messages to anyone visiting your Masjid page.' />
        <Benefit Comp ={Maximize} heading='Full Screen Layouts' 
        para ='System supports Full HD 1920 x 1080' />
        <Benefit Comp ={Pause} heading='Automatic Resumes' 
        para ='Automatic resumes after power failure.' />
        <Benefit Comp ={TabletSmartphone} heading='Mobile and Tablet' 
        para ='Same information on all type of devices.' />
        </div>
        </div>
      </div>
      <div>

        {/* <Link to='/setprayertiming'>Prayer timing</Link> */}
      </div>
      <Footer/>
    </>
  );
}

export default HomePage;
