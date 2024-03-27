import React from 'react'

function Post() {
  return (
    <div className="post">
        <div className="image">
          <img src="https://www.digitaltrends.com/wp-content/uploads/2021/11/macbook-pro-2021-16.jpg?fit=1500%2C1000&p=1"></img>
        </div>
        <div className="texts">
          <h2>Full house battery backup coming this year</h2>
          <p className="info">
            <a href="" className="author">Varshaa</a>
            <time>25-03-2024 12:30</time>
          </p>
          <p className='summary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate animi ducimus exercitationem, repudiandae iste delectus. Voluptatibus expedita qui vitae, asperiores quibusdam repudiandae debitis impedit sit reprehenderit mollitia tempora, sequi quaerat!</p>
        </div>
      </div>
  )
}

export default Post