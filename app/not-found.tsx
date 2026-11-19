import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page">
      <div className="container">
        <header className="sec-head">
          <span className="sec-idx">404</span>
          <h1 className="page-title">arquivo não encontrado</h1>
          <code className="sec-cmd">
            <b>$</b> ls: no such file
          </code>
        </header>
        <Link className="btn btn--primary" href="/">
          <span className="p">$</span> voltar ao início
        </Link>
      </div>
    </main>
  );
}
