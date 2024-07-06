import Title from '../../components/Title';
import ReviewCard from '../../components/ReviewCard';

function Reviews() {
    return (
        <div className="wrapper">
            <div className="mt-[64px]">
                <Title className=" text-[32px] lg:text-[40px] text-center lg:text-left">Phản hồi của khách hàng</Title>
                <ReviewCard />
            </div>
        </div>
    );
}

export default Reviews;