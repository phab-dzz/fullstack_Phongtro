import react from "react";
import { SearchItem } from "../../components";
import icons from "../../utils/icons";

const { GrNext, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiDelete, FiSearch } = icons;
const Search = () => {
    return (
        <div className="p-[10px] m-3  bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2">
            <SearchItem text='Phòng trọ,nhà trọ' IconBefore={<MdOutlineHouseSiding />} fontWeight IconAfter={<GrNext />} />
            <SearchItem text='Toàn quốc' IconAfter={<GrNext />} IconBefore={<HiOutlineLocationMarker />} />
            <SearchItem text='Chọn giá' IconAfter={<GrNext />} IconBefore={<TbReportMoney />} />
            <SearchItem text='diện tích' IconAfter={<GrNext />} IconBefore={<RiCrop2Line />} />
            <button
                type="button"
                className="outline-none py-2 px-2 w-full bg-blue-500 text-sm rounded-lg text-[11.5px] flex items-center justify-center gap-2 text-white  font-medium ">

                <FiSearch />
                Tìm kiếm
            </button>
        </div>
    );

}
export default Search;