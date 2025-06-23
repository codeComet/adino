const BulletList = ({item}) => {
  return (
    <div className="flex gap-4 justify-start items-start py-2.5 border-l-[4px] border-primary pl-2 mb-4 bg-[#F0FDF480]">
      <div className="w-2 h-2 rounded-full bg-primary mt-2 aspect-square"></div>
      <p className="text-[#166636] font-inter font-medium text-base md:text-lg leading-5.5">
        {item}
      </p>
    </div>
  );
}

export default BulletList