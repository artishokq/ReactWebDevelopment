interface Props {
  name: string;
  date: string;
}

export function Footer({ name, date }: Props) {
  return (
    <footer className="footer">
      Выполнил: {name}, {date}.
    </footer>
  );
}

export default Footer;