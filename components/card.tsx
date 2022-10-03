const Card = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="container">
      <div className="w-full rounded-xl shadow p-4">{children}</div>
    </div>
  );
};

export default Card;
