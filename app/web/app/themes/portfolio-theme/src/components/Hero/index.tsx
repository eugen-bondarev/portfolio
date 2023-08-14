import styles from "./styles.module.scss";
import Heading from "../Heading";
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { ReactComponent as CopyIcon } from "line-awesome/svg/copy.svg";
import { ReactComponent as CheckmarkIcon } from "line-awesome/svg/check-solid.svg";
import Button from "../Button";

interface SymbolProps {
  content: string;
  className?: string;
}

const Symbol = ({ content, className }: SymbolProps) => (
  <span className={clsx("text-accent", className)}>{content}</span>
);

interface HeroProps {
  title: ReactNode;
  subtitle: ReactNode;
}

const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

const Hero = ({ title, subtitle }: HeroProps) => {
  const email = "eug.bondarev@gmail.com";
  const [copyCounter, setCopyCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const copy = (e: MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(email);
    setCopyCounter((current) => current + 1);
    setTimeout(() => setCopyCounter((current) => current + 1), 1000);
  };

  const modalRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const callback = (event: MouseEvent) => {
      if (!modalVisible) {
        return;
      }
      if (!modalRef?.current) {
        return;
      }
      if (!modalRef.current.contains(event.target as any)) {
        setModalVisible(false);
      }
    };
    window.addEventListener("click", callback);
    return () => window.removeEventListener("click", callback);
  }, [modalVisible]);

  const icon =
    copyCounter % 2 === 0 ? (
      <CopyIcon width="32" height="32" />
    ) : (
      <CheckmarkIcon width="32" height="32" />
    );

  console.log({ copyCounter });

  return (
    <div className={styles.hero}>
      <Heading className="flex items-center max-md:flex-col-reverse max-md:gap-4 justify-between relative z-[1]">
        <div className="flex flex-col gap-8">
          <div className={styles.title}>
            <Symbol content=">" />
            {title}
            <img
              className="w-[64px] h-[64px] inline ml-4"
              src="https://eugen-bondarev.com/app/uploads/2023/08/21f2078d23f9195570a3711c018328b2.png"
            />
          </div>
          <div className="flex gap-4 relative">
            <Button onClick={() => setModalVisible(true)}>Contact</Button>
            <Button href="#projects" light>
              Projects
            </Button>
            <div
              ref={modalRef}
              style={{ opacity: modalVisible ? 1 : 0 }}
              className="absolute left-0 top-16 !bg-white text-dark-1 font-normal text-xl p-4 !rounded-md shadow-md flex gap-3"
            >
              {email}
              <button onClick={copy}>{icon}</button>
            </div>
          </div>
        </div>
        <img
          className={styles.img}
          src="https://github.com/eugen-bondarev/portfolio-github-pages/blob/main/images/msg408276424-1368071.jpg?raw=true"
        />
      </Heading>
    </div>
  );
};

export default Hero;
