import { Typography2 } from '@root/shared/components/atomics';
import { Heading } from '@root/shared/components/atomics/Heading';

export default function MyStory() {
  return (
    <div className='flex flex-col justify-between flex-grow h-full mt-2'>
      <Heading>My Story</Heading>
      <Typography2 gutterBottom>
        I grew up in China and I came across the sea to Toronto in 2018. With a
        dream to be in a part of software development,I started my study as an
        international student in Canada.
      </Typography2>
      <Typography2 gutterBottom>
        I have worked in the Marketing area for around 3 years. When I was
        working at the website builder tool provider, NiceNic, I was required to
        learn about how the website runs. During that experience, I found my
        passion for those information technologies. The magic of coding kindled
        my passion and I decided to dive into it without turning around.
      </Typography2>
      <Typography2 gutterBottom>
        In my more than two years study in York University for the Honour's
        degree, I learned Java, JavaScript, as well as Object-Oriented
        Programming, System Design and architecture in Software Development.
        Just as the life itself, it turned out programming is not a paved path
        with beautiful flowers and sunshine. Nevertheless, I am dedicated to
        accept any possible challenge on this path.
      </Typography2>
      <Typography2>
        As a recent graduate, I’m seeking a full-time web developer role where I
        can work with senior developers and designers to raise my standards for
        software programming. I may not be young as my other counterparts, my
        desire for learning more is not less than any of them.
      </Typography2>
    </div>
  );
}
