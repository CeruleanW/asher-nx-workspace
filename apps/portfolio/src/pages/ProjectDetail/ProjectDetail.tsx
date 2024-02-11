//@ts-nocheck
import { Box, Container } from '@root/shared/components/atomics/Container';
import { Grid } from '@root/shared/components/atomics/Grid';
import { Typography2 } from '@root/shared/components/atomics/Typography';
import Description from '../../components/molecules/Description';
import { useParams } from 'react-router-dom';
import { FeatureList } from '../../components/molecules/MetaDataList';
import { useProjectDataByID } from '../../hooks';
import { Loading } from '../../components/atomics/Loading';
import { H1 } from '@root/shared/components/atomics/Heading';
import Image from '@root/shared/components/atomics/Image';

export function MetaData(props) {
  return (
    <Grid container justifyContent={'space-between'}>
      {props.children}
    </Grid>
  );
}

function Heading(props) {
  return (
    <div>
      <Typography2 variant={'h2'}>{props.children}</Typography2>
    </div>
  );
}

export function ProjectDetailPage(props) {
  // Hooks
  const { id } = useParams() as any || {}; //pure item id
  const { projectData, isLoading, error } = useProjectDataByID(id);

  if (error) {
    return <div>Error! {error?.messsage}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const { title, content, live, type, techs, repo, illustrations } =
    projectData || {};

  // render the img by index
  const renderIllustration = (index) => {
    try {
      if (illustrations[index]) {
        return (
          <Box
            maxWidth={1000}
            maxHeight={1280}
            display='flex'
            justifyContent='center'
          >
            <Image
              src={illustrations[index]}
              alt={'illustration'}
              style={{ maxWidth: ' 100%', height: 'auto', objectFit: 'contain' }}
            />
          </Box>
        );
      }
    } catch {
      return null;
    }
  };

  return (
    <>
      <Container>
        <Box mt={14}>
          <H1>{title}</H1>
          <Box mt={6} maxWidth={800}>
            <Description>{content?.introduction}</Description>
          </Box>
          <Box mt={4} maxWidth={870}>
            <MetaData>
              <FeatureList label={'Type'} item={type} />
              <FeatureList label={'Techs'} items={techs} />
              <FeatureList
                label={'Source Code'}
                item={repo}
                isLink={true}
                linktext={'Repo'}
              />
              <FeatureList
                label={'Demo'}
                item={live}
                isLink={true}
                linktext={'Visit Site'}
              />
            </MetaData>
          </Box>
        </Box>
        <Box mt={4}>{renderIllustration(0)}</Box>
        {content?.goal ? <Box mt={6} maxWidth={1024}>
          <Heading>Project Goal</Heading>
          <Box mt={2}>
            <Description>{content?.goal}</Description>
          </Box>
        </Box> : null}
        {content?.spotlight ? (
          <Box mt={8} maxWidth={1024}>
            <Heading>Spotlight</Heading>
            <Box mt={2}>
              <Description>{content?.spotlight}</Description>
            </Box>
          </Box>
        ) : null}
        <Box mt={10}>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={6}>
              {renderIllustration(1)}
            </Grid>
            <Grid item xs={12} lg={6}>
              <Heading>Problems</Heading>
              <Box mt={5} maxWidth={650}>
                {content.problem.map((p, index) => (
                  <Description key={'para-' + index}>{p}</Description>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mx={'auto'} mt={10} mb={10} maxWidth={1024}>
          <Typography2 variant={'h2'} align={'center'}>
            Lessons Learned
          </Typography2>
          <Box mt={6}>
            {content.lesson.map((p, index) => (
              <Description key={'para-' + index} align={'center'}>
                {p}
              </Description>
            ))}
          </Box>
          <Box mt={4}>{renderIllustration(2)}</Box>
        </Box>
      </Container>
    </>
  );
}
