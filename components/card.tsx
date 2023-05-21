const Card = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="container w-fit">
      <div className="rounded-xl shadow p-4">{children}</div>
    </div>
  );
};

export default Card;
