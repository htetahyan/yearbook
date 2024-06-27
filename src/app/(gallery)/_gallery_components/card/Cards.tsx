'use client';
import React, {useCallback, useEffect, useRef} from 'react';
import Card from "~/app/(gallery)/_gallery_components/card/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "~/app/_components/providers/hooks";
import useFetchGallery from "~/hooks/useFetchGallery";

const Cards = () => {
    const params = useAppSelector((state) => state.filter);
    const filter = params.filter
    const [offset, setOffset] = React.useState(0);
    const { cards, isLoading, isError,hasMore } = useFetchGallery({ limit: params.limit, offset, filter });


    const observer = useRef<IntersectionObserver>();
const bottomRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
        if (entries?.[0]?.isIntersecting && hasMore) {
            setOffset((prev) => prev + params.limit);
        }else {
          if(offset >12 )  setOffset((prev) => prev - params.limit);
        }
    })

    if (node) observer.current.observe(node);
}, [isLoading, hasMore,cards.length]);



        return (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 lg:grid-cols-6 w-full'>
                {cards?.map((card, i) => (
                    <div

                        key={i}
                    >
                        <Card
                            studentId={card?.yearbook?.student_id as string}
                            grade={card?.yearbook?.campus as string}
                            academicYear={card?.yearbook?.academicYear as string}
                            campus={card?.yearbook?.campus as string}
                            image={card.files.url ?? ''}
                            total_likes={card?.yearbook?.total_likes}
                            name={card.yearbook!.name}
                            caption={card.yearbook!.caption}
                            liked={!!card?.likes}
                            id={card.yearbook!.id}
                        />
                    </div>
                ))}
                {hasMore && <div ref={bottomRef} className='w-full h-10 flex justify-center items-center'>Loading...</div>}
            </div>
        );

};

export default Cards;
