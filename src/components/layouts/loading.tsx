const Loading = () => {
    return (
        <div className="flex items-end gap-5">
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin dark:border-primary" />
            <p className="text-forefround">
                Loading java<span className="text-primary">9</span>cell
            </p>
        </div>
    );
};

export default Loading;
