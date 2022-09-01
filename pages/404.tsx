import Layout from "../components/layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="p-5">
        <h1>404</h1>
        <p>We use NextJS here, Django is not found.</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
