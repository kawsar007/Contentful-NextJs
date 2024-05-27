const url = `${process.env.BASE_URL}/spaces/${process.env.SPACE_ID}/environments/staging/entries?access_token=${process.env.ACCESS_TOKEN}`;
console.log(url);
export default function Home() {
  return <main>Contentful with Next Js</main>;
}
