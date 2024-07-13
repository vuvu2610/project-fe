import BannerImg from "../../assets/images/bgg.jpg";
// import start from "../../assets/images/start.svg";

function Banner() {
  return (
    <div >
      <div className="wrapper flex lg:flex-row flex-col bg-cover bg-no-repeat " style={{backgroundImage : `url(${BannerImg})`}} >
        <div className="lg:my-[80px] my-10 max-w-[577px] px-6">
          <h3 className="lg:text-[64px] text-[32px] font-bold leading-[1]">
            Tìm kiếm cây giống cho bạn
          </h3>
          <p className="my-[32px]">
            Chào mừng bạn đến với seedling - nơi bạn có thể tìm thấy
            những cây giống chất lượng cao và đa dạng, đem lại sự xanh tươi cho
            không gian của bạn.
          </p>

          <button className="mb-10 py-4 px-[54px] bg-black text-white rounded-[62px] w-full lg:w-auto">
            Mua ngay
          </button>

          <div className="flex items-center flex-wrap text-center">
            <div className="border-r border-[rgba(0, 0, 0, 0.10)] px-2">
              <span className=" text-3xl">200+</span>
              <p>Sản phẩm</p>
            </div>
            <div className="border-r border-[rgba(0, 0, 0, 0.10)] px-2">
              <span className=" text-3xl">2,000+</span>
              <p>Chất lượng cao</p>
            </div>
            <div className="px-2">
              <span className=" text-3xl">30,000+</span>
              <p>Khách hàng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
