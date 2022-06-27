import React from 'react';

const Result = ({res}) => {
  return (
    <>
        {res &&
        <div className="container mb-5">
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-colored">
            <tr>
              <th scope="col">Types</th>
              <td>Result</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Efficiency</th>
              <td>{parseFloat(res.data.efficiency).toFixed(2)}%</td>
            </tr>
            <tr>
              <th scope="row">Opinion</th>
              <td style={{textTransform: 'capitalize'}}>{res.data.opinion}</td>
            </tr>
          </tbody>
        </table>
      </div>
       }
    </>
  )
}

export default Result