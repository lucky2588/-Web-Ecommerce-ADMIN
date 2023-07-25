import React from 'react'
import { Link } from 'react-router-dom'
import { useGetBrandQuery } from '../../app/service/brandApi'
import { useGetInfoQuery } from '../../app/service/infoApi';

function ListBrand() {
    const { data, isLoading } = useGetBrandQuery();
    const { data: infoTotal } = useGetInfoQuery();

    if (isLoading) {
        return <h2>Is Loading !! </h2>
    }


    return (
        <>
        
            <div className="main">
            <Link to={'create'}  className="btn btn-warning mg-2 mb-4 ">Create</Link>
            <br></br>
                <div className="row">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">
                                
                                <h2 className="card-title text-center">Brand</h2>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10px' }}>ID</th>
                                            <th className='text-center'>Task</th>
                                            <th>Progress</th>
                                            <th style={{ width: '30px' }}> Nums </th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((e) => (
                                            <tr>
                                                <td>{e?.id}</td>
                                                <td className='text-center'>{e?.name}</td>
                                                <td>
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0"
                                                         style={{ width: `${e?.nums/infoTotal?.numsProduct}%` }}
                                                        
                                                        aria-valuemax="100"></div>
                                                    </div>
                                                </td>
                                                <td><span className="badge bg-danger text-center">{e?.nums}</span></td>
                                                <td className='text-center'>
                                                    <Link to={`${e?.id}`} type="button" class="btn btn-square btn-primary m-2"><i class="fa fa-eye"></i></Link>
                                                 
                                                </td>
                                            </tr>
                                        )
                                        )
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>



                    </div>

                </div>





            </div>














        </>
    )
}

export default ListBrand