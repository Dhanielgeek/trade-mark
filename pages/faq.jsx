import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import { Collapse } from "react-collapse";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Faq = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }

    setOpen(index);
  };

  return (
    <MainLayout>
      <div className="faq">
        <div className="faq_inner ">
          <div className="faq_hero">
            <div className="faq_hero_inner main_container sub_container ">
              <div className="mt-[5rem] mb-[2rem]">
                <h4 className="text_medium capitalize">FAQ section</h4>
                <p
                  className=" text-base sm:text-lg
                 font-bold capitalize"
                >
                  Home &gt; Frequently asked questions
                </p>{" "}
              </div>
            </div>
          </div>

          {/* QUESTIONS SEC */}
          <div className="w-full main_container sub_container">
            <div className="mt-[3rem] grid gap-[1rem]">
              {FaqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  open={index === open}
                  title={item.title}
                  desc={item.desc}
                  toggle={() => toggle(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Faq;

const AccordionItem = ({ open, toggle, title, desc }) => {
  return (
    <div className="">
      <div
        className="shadow_main transition-all duration-300 ease-in-out  transform scale-95 hover:scale-100 small cursor-pointer rounded-xl overflow-hidden flex flex-col justify-between"
        onClick={toggle}
      >
        <div
          className={`${
            open ? "banks_bg" : ""
          }  flex justify-between p-[1rem] gap-2 items-center py-5 rounded-xl`}
        >
          <h3 className="text-base md:text-xl font-semibold uppercase">
            {title} ?
          </h3>
          <div className="text-xl">
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        <Collapse isOpened={open}>
          <p className="px-4 py-2 text_small xl:max-w-[70%]">{desc}</p>
        </Collapse>
      </div>
    </div>
  );
};

const FaqData = [
  {
    title: "How do I deposit funds?",
    desc: "To deposit funds, simply log in to your account and navigate to the 'Deposit' section. Follow the instructions to complete the transaction securely.",
  },
  {
    title: "How long does it take to close my account and get a refund?",
    desc: "Account closure and refund processing times vary. Contact our support team for assistance, and we'll guide you through the process promptly.",
  },
  {
    title: "Are there any hidden charges or fees?",
    desc: "We believe in transparency. There are no hidden charges or fees. Our pricing is straightforward and clearly outlined for your convenience.",
  },
  {
    title: "How do I get started?",
    desc: "Getting started is easy! Sign up for an account, complete the verification process, and explore our platform's features to begin your investment journey.",
  },
  {
    title: "When do I get paid?",
    desc: "Earnings are typically processed according to your chosen payout method and schedule. Check your account dashboard for payment updates and details.",
  },
];
