
import fetch from 'isomorphic-unfetch'
import MaterialTable from 'material-table'
import Head from 'next/head'
import _ from 'lodash'
import Layout from '../components/Layout'
import Router from 'next/router'


function Index({data}) {
  
  data = _.orderBy(data,'points', 'desc')

  const topRanks = []
  
  for (let i = 0; i < data.length; i++) {
    
    // console.log(data[i]['points'])

    if (!(topRanks.includes(data[i]['points']))) {
      if (topRanks.length < 3) {
        topRanks.push(data[i]['points'])
        // console.log('pushed!')
      } else {
        break
      }
    }

  }

  // console.log(topRanks)


  const style = {
    maxWidth: '80%',
  }

  const goldStyle = {
    backgroundColor: '#F7D100',
    // color: 'red',
    border: '0',
    backgroundImage: 'linear-gradient(#FDD710, #CB9404)',

    border: '3px solid transparent',
    borderColor: '#CB9404',
    boxShadow: '0 0 100px red',
    
  }

  const silverStyle = {
    backgroundColor: '#C0C0C0',
    backgroundImage: 'linear-gradient(#f6f6f6, #C6C6C6)',

   
    
  }

  const bronzeStyle = {
    backgroundColor: '#cd7f32',
    backgroundImage: 'linear-gradient(#DF9C82, #9A4F38)',
  }
  return (
    <Layout>
    <Head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <link rel="icon" type="img/png" href="static/hng-favicon.png"></link>
    <title>HNGi7 Leaderboard</title>
    </Head>
    
    <div style={style} className="container">
    <img src="static/hng_logo-min.png" alt="HNG logo" className="mainLogo"/>
    <h1 className="leaderboard">LEADERBOARD</h1>
    <hr className="hr"/>
    <MaterialTable
    title=""
    columns={[
            { title: 'Full Name', field: 'fullName', sorting: false},
            { title: 'Username', field: 'userName', sorting: false },
            { title: 'Email', field: 'email', sorting: false},
            { title: 'Points', field: 'points' , type: 'numeric'}
          ]}
    data={data}
    // pageSize={10}
    actions={[
      {
        icon: 'share',
        tooltip: 'Tweet',
        onClick: (event, rowData) => {
          const { points, email, fullName, userName } = rowData
          var message = `${points} points in HNGi7!%0a`

          if (topRanks.includes(points)) {
            if (points === topRanks[0]) {
              message += 'GOLD RANK%0a'
            } else if (points === topRanks[1]) {
              message += 'SILVER RANK%0a'
            } else {
              message += 'BRONZE RANK%0a'
            }
          }

          // message += '%0a@hnginternship #hng #hnginternship #programming'
          message += '@hnginternship '
          message += '&hashtags=hng%20%2Chnginternship%20%2Cprogramming%20%2Ctech'
          // console.log(message)
          // const finalMsg = message.replace(' ', '%20')
          document.location.href = `https://twitter.com/intent/tweet?text=${message}`
        }
      }
    ]}
    options={{
      draggable: false,
      pageSize: 20,
        rowStyle: rowData => {
          const { points } = rowData
          if (topRanks.includes(points)) {
            if (points == topRanks[0]) {
              return goldStyle
            } else if (points == topRanks[1]) {
              return silverStyle
            } 
            return bronzeStyle

          } else {
            return { backgroundColor: '#FFF'}
          }
        }
      }}

    
      >
    </MaterialTable>
     </div>
     </Layout>
 
  )
}



Index.getInitialProps = async function() {
  const API_URL = 'https://agile-cliffs-64902.herokuapp.com/records'
  const res = await fetch(API_URL)
  const data = await res.json()
  return {
    data
  }
}

export default Index