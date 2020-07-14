import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { READ_LINKS } from '../../api/util/queries'
import Layout from '../components/layout'

const Dump = props => (
  <div
    style={{
      fontSize: 20,
      border: '1px solid #efefef',
      padding: 10,
      background: 'white',
    }}
  >
    {Object.entries(props).map(([key, val]) => (
      <pre key={key}>
        <strong style={{ color: 'white', background: 'red' }}>
          {key} 💩
        </strong>
        {JSON.stringify(val, '', ' ')}
      </pre>
    ))}
  </div>
)

export default () => {
  const fetchData = async () => {
    let name = `Linky Link`
    let url = `https://sasaljjdfks.com`
    let description = `Linky Link Description`
    const body = { name, url, description }
    // const response = await fetch(`/api/create-link`, {
    //   method: `POST`,
    //   body: JSON.stringify(body),
    // })
    const response = await fetch(
      `/api/get-links?queryName=${READ_LINKS}&queryMethod=POST`
    )
    const data = await response.json()
    return data
  }

  const { status, data, error } = useQuery('latest', fetchData)
  if (status === 'loading')
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  if (status === 'error')
    return (
      <Layout>
        <div>Error! {JSON.stringify(error)}</div>
      </Layout>
    )

  const { data: linksData } = data.allLinks
  return (
    <Layout>
      <ReactQueryDevtools initialIsOpen={false} />
      <h1>Hello</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {linksData.map(l => {
        console.log('=====================')
        console.log(l)
        console.log('=====================')
        return (
          <>
            <p>{l.name}</p>
            <p>{l.url}</p>
            <p>{l.description}</p>
          </>
        )
      })}
    </Layout>
  )
}
