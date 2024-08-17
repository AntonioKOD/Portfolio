import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HyperText from "./magicui/hyper-text";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ShinyButton from "./magicui/shiny-button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Skills from "./Skills";

export default function CardSkills() {
  return (
    <div className="flex flex-col align-center">
      <h1 className="text-4xl text-black justify-center p-2 mx-auto antialiased font-bold">
        Skills
      </h1>
      <div className="grid grid-cols-2 gap-3 p-4">
        <Card>
          <CardHeader>
            <CardTitle>React</CardTitle>
            <CardDescription>
              My go-to tool for building fast, interactive user interfaces that
              deliver exceptional experiences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            With React, I build robust applications that are not only
            lightning-fast but also SEO-friendly, thanks to its server-side
            rendering capabilities. React empowers me to construct reusable
            components, ensuring that every interaction feels smooth and every
            page loads instantly.
          </CardContent>
          <CardFooter>
            <Link
              href="https://react.dev/"
              className=" outline-double p-2 rounded"
            >
              Learn More About React
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Python & Express</CardTitle>
            <CardDescription>
              The backend magic, powering robust and scalable server-side
              applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            The backbone of any great application lies in its backend, and
            Python paired with Express is where I work my backend sorcery.
            Python is my language of choice for its readibility and versatility,
            allowing me to write clean, efficient code that scales effortlessly.
            Express, a minimal and flexible Node.js web application framework,
            provides the structure needed to build powerful APIs and backend
            services.
          </CardContent>
          <CardFooter>
            <Popover>
              <PopoverTrigger className="outline-double rounded p-2">
                Learn More
              </PopoverTrigger>
              <PopoverContent>
                <ul>
                  <li>
                    <Link href="https://python.org">Python</Link>
                  </li>
                  <li>
                    <Link href="https://expressjs.com/">Express</Link>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </CardFooter>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Node.js</CardTitle>
            <CardDescription>
              The engine that drives my server-side scripts with power and
              efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            Built on Chrome&apos;s VB Javascript engine, Node.js allows me to
            write server-side code that is fast, scalable, and efficient.
            It&apos;s perfect for handling multiple connections simultaneously,
            making it ideal for real-time applications like chat servers, APIs,
            and single-page applications. With a vast ecosystem of libraries and
            tools, Node.js allows me to build everything from simple scripts to
            complex microservices architecture.
          </CardContent>
          <CardFooter>
            <Link
              href="https://nodejs.org"
              className="outline-double p-2 rounded"
            >
              Learn More About NodeJS
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bug Whisperer</CardTitle>
            <CardDescription>Comes with a high success rate and minimal code tears</CardDescription>
          </CardHeader>
          <CardContent>
            Master of the arcane art of bug detection and elimination. With a patience of a saint and the intuition of a seasoned detective, I communicate with the mischievous bugs hiding deep within the code. Through subtle persuasion and a dash of humor, I bring them out of their hiding places, whether they&apos;re nestled in a forgotten loop or lurking in a conditional statement.
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Other Skills</CardTitle>
            <CardDescription>
              Some of the other skills include Github, Figma, TailwindCSS,
              Vercel for deployment, PostgreSQL, etc.
            </CardDescription>
          </CardHeader>
          <CardContent>
            In the world of version control, GitHub is my fortress, safeguarding
            the integrity and history of every project I undertake. Once the
            development is done, it&apos;s time to bring the project to life on
            the web. Vercel is my deployment platform of choice, known for its
            ease of use and scalability. Design is where creativity meets
            precision, and with Figma and TailwindCSS, I turn ideas into
            visually stunning realities. PostgreSQL is a powerful, open-source
            relational database system known for its robustness and flexibility.
            Whether I&apos;m working with complex queries, stored procedures, or
            handling large volumes of data, PostgreSQL delivers high performance
            and reliability.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
