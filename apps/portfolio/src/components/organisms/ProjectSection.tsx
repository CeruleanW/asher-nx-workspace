//@ts-nocheck
import React from 'react';
import { Button } from '@material-ui/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/components.module.scss';
import { Card } from '@nextui-org/react';
import { PAGE_ROUTES } from '../../routes';
// Single project section

const scaleAni = { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } };

function ProjectCard(props) {
  const { id, title, image } = props;
  // const { url } = useRouteMatch();

  return (
    <motion.div className={`w-11/12 lg:w-2/5 max-w-full mt-4`} {...scaleAni}>
      <Link to={`${PAGE_ROUTES[1]}/${id}`}  >
        <Card cover>
          <Card.Image
            src={image}
            alt={title}
            width='100%'
            height={'auto'}
            showSkeleton={false}
          />
        </Card>
      </Link>
    </motion.div>
  );
}

function ProjectText(props) {
  const { isRightNarrow, title, subtitle, id, index } = props;
  // const { url } = useRouteMatch();

  return (
    <div
      className={`text-center max-w-full mt-8 lg:max-w-screen-sm  ${isRightNarrow ? 'lg:ml-14' : 'order-first lg:mr-14'
        }`}
    >
      <motion.div {...scaleAni}>
        <h2 className={`text-center text-2xl lg:text-left`}>
          {`${index + 1}. ${title}`}
        </h2>
        <p className={`mt-3 text-base lg:text-left`}>{subtitle}</p>
        <div
          className={`flex flex-wrap mt-20 lg:mt-14 justify-center lg:justify-start`}
        >
          {props.techs.map((tech, index) => (
            <span
              key={'tech-' + tech}
              className={`${styles.chip} ${index === 0 ? 'pl-0 pr-2' : 'px-2'}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div
        className={`flex justify-center items-center mt-8 mb-6`}
        {...scaleAni}
      >
        <Button
          variant='contained'
          color='primary'
          size='large'
          component={Link}
          // to={`${url}/${id}`}
          to={`${PAGE_ROUTES[1]}/${id}`}
        >
          Check it out!
        </Button>
      </motion.div>
    </div>
  );
}

/**
 *  Structure:
 * - title
 *  - function
 *  - explanations of projects to illustrate how you handle problems
 */
export function ProjectSection(props) {
  const { className, ...rest } = props;

  return (
    <section className={`${className} `} data-cy={'project-section'} >
      <div className='flex flex-col lg:flex-row justify-center items-center mt-10 lg:mt-4 max-w-full flex-grow'>
        <ProjectCard {...rest} />
        <ProjectText {...rest} />
      </div>
    </section>
  );
}
