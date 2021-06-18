import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RenderCard from '../../components/RenderCard'
import CustomPagination from '../../components/CustomPagination'
import { SearchMult } from '../../lib/apiTmdb'
import { MainContainer } from '../../components/styles'


export default function Movie() {
    const Router = useRouter()
    const { keyWord } = Router.query
    const [data, setData] = useState(null)

    const [page, setPage] = useState(1);


    useEffect(() => {
        (async function () {
            if(keyWord)
            setData({ ...await SearchMult(keyWord, page) })
        })()
    }, [keyWord, page])



    return (
        <MainContainer>
            {data ?
                <>
                    <RenderCard list={data.results} />
                    <CustomPagination page={page} maxPage={data.total_pages} setPage={setPage} />
                </>
                :
                ""
            }
        </MainContainer>
    )
    

}