import NewsSuggestionComponent from "@/components/NewsSuggestion/NewsSuggestionComponent";
import { getNews } from "@/lib/getNews";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { formatDate } from "@/utils/formateDate";
import { CalendarDays, Eye, User } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

const SingleNews = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const { id } = params;
  const newsItem = await getSingleItemById("news", id);
  const newsCollection = await getNews();
  const filteredNews = newsCollection.filter(
    (item) => item._id.toString() !== id
  );
  const { title, imageLink, description, date, author, views } = newsItem;
  const fallbackImage =
    "https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg";

  if (!newsItem) {
    notFound();
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="col-span-1 lg:col-span-3 space-y-8">
        <p className="mb-4 flex items-center gap-2">
          <span>
            <CalendarDays />
          </span>{" "}
          {formatDate(date)}
        </p>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="h-96 lg:h-[450px] rounded-lg shadow-2xl relative">
          <Image
            src={imageLink ? imageLink : fallbackImage}
            alt="news-photo"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized
            className="object-cover rounded-lg"
          ></Image>
        </div>
        <div className="flex gap-4">
          <p className="flex items-center gap-1">
            <span>
              <User />
            </span>
            {author}
          </p>
          <p className="flex items-center gap-1">
            <span>
              <Eye />
            </span>
            {views}
          </p>
        </div>
        <p className="text-justify">
          {description} Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Consectetur quaerat a saepe, blanditiis explicabo sint ipsa
          commodi at doloremque, distinctio dignissimos? Officiis at est maxime
          ea fuga pariatur facere dolores nam libero beatae qui eligendi eius
          reprehenderit unde aliquam totam provident non accusamus laboriosam
          quae dolor quidem, labore ducimus? Dolor dolores, odit dicta atque
          asperiores excepturi eaque reprehenderit laudantium impedit magnam ea
          cupiditate enim aperiam non distinctio tempora commodi sunt corporis
          maxime ex provident beatae! Cum repellat, maiores dignissimos
          similique dicta dolores adipisci beatae alias iure voluptate eum earum
          fugit excepturi unde deleniti. Accusantium natus perferendis officia
          obcaecati ratione nesciunt quia commodi fuga dicta illum. Totam
          similique accusantium molestiae quasi, nam nesciunt neque
          reprehenderit ipsam, atque architecto vitae. Quos dolorum fugit
          aspernatur? Dignissimos sit odit debitis ipsa quo corrupti aspernatur,
          nihil neque! Voluptate neque nisi unde odio itaque maxime fugiat nemo
          quidem iusto ut vitae debitis, repellat vero officia a dolores
          blanditiis possimus eligendi, incidunt molestiae recusandae
          distinctio? Placeat quidem optio ipsum perferendis natus aperiam
          beatae atque voluptatum quasi corporis, magni inventore fuga
          exercitationem! Repellat fugiat dolore porro architecto. Rerum nihil
          vel quia ab deleniti aperiam. Dicta nobis reiciendis numquam dolorum
          pariatur porro optio, et eos esse. Consequatur repudiandae laborum
          similique doloremque tempora facilis quaerat obcaecati molestias. Nisi
          similique eius assumenda repudiandae nulla odit ea nemo recusandae nam
          tempora quibusdam, aspernatur cum, excepturi mollitia quae inventore
          nostrum adipisci dolore ipsa dolores fuga? Perferendis odit rerum
          corrupti dolore optio fugiat quas amet quidem doloremque. Cum amet
          recusandae a beatae doloremque nostrum consectetur rerum veritatis
          earum, sed itaque voluptatum exercitationem quibusdam culpa aliquam,
          quisquam nemo sit non voluptas, at dignissimos! Autem reprehenderit
          voluptas est error aliquam dolorum aspernatur debitis soluta, placeat
          excepturi dignissimos laudantium nisi modi veniam dolores laborum quod
          consequatur non, accusamus, id veritatis sequi eaque. Quas, nisi!
          Repellendus, nisi consectetur.
        </p>
      </div>
      <div className="col-span-1 pt-12">
        <div className="sticky top-20 max-h-screen overflow-auto">
          <NewsSuggestionComponent newsCollection={filteredNews} />
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
