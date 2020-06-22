function Layout(props) {
  return (
    <div className="page-layout">
      {props.children}
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Krona+One&family=Lato:wght@700&display=swap');
        body {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.8;
          color: #084482;
          font-family: 'Lato', sans-serif;
          background-color: #00AEFF;
         
        }
        h1 {
          font-weight: 700;
          font-family: 'Krona One', sans-serif;
        }
        p {
          margin-bottom: 10px;
        }

        td {
          color: #084482;
        }

        .container {
          margin: auto;
          background-color: white;
        }

        .mainLogo {
          display: block;
          margin: auto;
        }

        .leaderboard {
          text-align: center;
          color: #084482;
          font-size: 4em;
          margin-top: 0.05em;
          margin-bottom: 0.05em;
        }

        .hr {
          border: 8px solid #084482;
          border-radius: 5px;
          margin-left: 50px;
          margin-right: 50px;
          margin-top: 0;
        }
      `}</style>
    </div>
  )
}

export default Layout