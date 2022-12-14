import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { TbAdjustmentsHorizontal } from 'react-icons/tb'

const sortOption:{lable:string,id:string}[] = [
    { lable: 'جدید ترین', id: 'newset' },
    { lable: 'محبوب ترین', id: 'popular' },
    { lable: 'گران ترین', id: 'desc' },
    { lable: 'ارزان ترین', id: 'asc' }
]
const Sortbar = () => {
    const [show, setShow] = useState<boolean>(false);

    const router = useRouter()
    const [sort, setSort] = useState(router.query.sort || "newset")

    const sortHandler = (id: string):void => {
        setSort(id);
        router.query.sort = id;
        router.push(
            { pathname: router.pathname, query: router.query }
        )
    }
    const handleClose = ():void => setShow(false);
    const handleShow = ():void => setShow(true);
    return (
        <>
            <ul className="d-none d-md-flex nav nav-pills p-0 border rounded mt-5">
                <li className="nav-item py-2">
                    <a className="nav-link disabled" aria-current="page">
                        <TbAdjustmentsHorizontal className='ms-2' />
                        مرتب سازی
                    </a>
                </li>
                {sortOption.map(item => (
                    <li className={`nav-item cursor-pointer py-2 mx-2 ${item.id === sort && 'border-bottom border-success'}`} key={item.id} onClick={() => sortHandler(item.id)}>
                        <a className="nav-link">{item.lable}</a>
                    </li>
                ))}
            </ul>
            <div className='d-md-none w-100 d-flex justify-content-center'>
                <Button variant='light' className='mt-4 text-nowrap' onClick={handleShow}>
                    مرتب سازی
                    <TbAdjustmentsHorizontal className='me-2' />
                </Button>
            </div>
            <Offcanvas show={show} onHide={handleClose} placement='bottom' className='h-auto'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='display-2'>مرتب سازی</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex overflow-auto'>
                        {sortOption.map(item => (
                            <Button variant='light' className='mx-3 text-nowrap' key={item.id} onClick={() => sortHandler(item.id)}>{item.lable}</Button>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sortbar;