import Title from '../../components/Title';

function SeedlingType() {
    return (
        <div className="wrapper">
            <div className="bg-[#F0F0F0] rounded-[40px] px-4 lg:px-[64px]">
                <Title className="text-center text-[32px] lg:text-[40px] py-[64px]">Loại cây giống</Title>

                <div>
                    <div className="flex gap-5 flex-col md:flex-row mb-5">
                        <div className="w-full lg:w-1/3 rounded-[20px] overflow-hidden relative">
                            <img
                                src="https://lh3.googleusercontent.com/u/0/d/1TDVDJhBuCHMaLce2wn-2wSvC9oGyO4cq=w1920-h953-iv2"
                                alt="Casual"
                                className="w-full h-[190px] lg:h-[289px] object-cover hover:scale-[1.1] ease-in-out duration-300"
                            />
                            <span className="absolute top-5 left-5 text-[30px]  ">Cây ăn quả</span>
                        </div>
                        <div className="lg:w-2/3 w-full rounded-[20px] overflow-hidden relative">
                            <img
                                src="https://lh3.googleusercontent.com/u/0/d/1QNmWo9a_lAhyY8fJGsj5XEFDayMoIG4E=w742-h953-iv2"
                                alt="Formal"
                                className="w-full h-[190px] lg:h-[289px] object-cover hover:scale-[1.1] ease-in-out duration-300"
                            />
                            <span className="absolute top-5 left-5 text-[30px]  ">Cây kiểng</span>
                        </div>
                    </div>
                    <div className="flex gap-5 flex-col md:flex-row pb-[64px]">
                        <div className="lg:w-2/3 w-full rounded-[20px] overflow-hidden relative">
                            <img
                                src="https://lh3.googleusercontent.com/u/0/d/1QNmWo9a_lAhyY8fJGsj5XEFDayMoIG4E=w742-h953-iv2"
                                alt="Party"
                                className="w-full h-[190px] lg:h-[289px] object-cover hover:scale-[1.1] ease-in-out duration-300"
                            />
                            <span className="absolute top-5 left-5 text-[30px]  ">Cây hoa</span>
                        </div>
                        <div className="w-full lg:w-1/3 rounded-[20px] overflow-hidden relative">
                            <img
                                src="https://lh3.googleusercontent.com/u/0/d/1EH8G7ZJg7LY9CFUfzXXUTwNfwtAA_9Rj=w742-h953-iv2"
                                alt="Gym"
                                className="w-full h-[190px] lg:h-[289px] object-cover hover:scale-[1.1] ease-in-out duration-300"
                            />
                            <span className="absolute top-5 left-5 text-[30px]  ">Cây lâu năm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeedlingType;