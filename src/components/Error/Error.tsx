type Props = {
  code: number | string;
};

const styles: React.CSSProperties = {
  width: "100%",
  height: "100vh",
  background: "#f0e2e2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Error: React.FC<Props> = ({ code }) => {
  return (
    <div style={styles}>
      <h1>Hatolik ({code})</h1>
    </div>
  );
};

export default Error;
