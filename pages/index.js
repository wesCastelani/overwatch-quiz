import { useState } from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex:1;
//   background-size:cover;
//   background-position: center;
// `;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Head>
          <title>Alura Quiz - {db.title}</title>
        </Head>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Overwatch</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <Input
                name="nomeDoUsuario"
                placeholder="Diz seu nome ai e bora la!"
                onChange={(infoDoEvento) => {
                  setName(infoDoEvento.target.value);
                }}
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, user] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${user}`}
                    >
                      {`${user}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/wesCastelani" />
    </QuizBackground>
  );
}
