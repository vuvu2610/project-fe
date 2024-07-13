import Title from '../../components/Title';
import ReviewCard from '../../components/ReviewCard';
import { useTranslation } from 'react-i18next';

function Reviews() {
    const {t} = useTranslation();
    return (
        <div className="wrapper">
            <div className="mt-[64px]">
                <Title className=" text-[32px] lg:text-[40px] text-center lg:text-left">{t("title.comment")}</Title>
                <ReviewCard />
            </div>
        </div>
    );
}

export default Reviews;