import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGalerapage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, user] = context.query.id.split('___');

  const dbExterno = await fetch(
    `https://${projectName}.${user}.vercel.app/api/db`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .then((resJson) => resJson)
    .catch((err) => console.log(err));

  //console.log(dbExterno);

  return { props: { dbExterno } };
}
