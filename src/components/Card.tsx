import '../assets/styles/card.scss';

export default function Card({
    title, author_name, first_publish_year, cover_i, number_of_pages_median, ratings_average, first_sentence
}: any) {
    return (<div className="card-item flex flex-col rounded-2xl overflow-hidden px-6 pt-6 pb-4 gap-5">
        <img src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`} alt={title}
             className="w-full object-contain h-64"/>
        <div className="text-left">
            <h2 className="font-bold text-center mb-4 text-xl">{title}</h2>
            <p className="">Year: <b>{first_publish_year}</b></p>
            <p className="">Author: <b>{author_name.length && author_name[0]}</b></p>
            <p className="">Pages: <b>{number_of_pages_median}</b></p>
            <p className="">Rating: <b>{ratings_average}</b></p>
            <p className="first-sentance mb-2">{first_sentence && first_sentence.length && first_sentence[0]}</p>
        </div>
    </div>)
}