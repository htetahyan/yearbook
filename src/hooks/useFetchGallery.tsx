import { useGetCardsQuery } from "~/server/query/galleryApi";
import React, { useState, useEffect } from "react";
import {NewCard} from "~/slices/cardSlice";
import {CardsType} from "~/server/gallery/actions";

export default function useFetchGallery({ limit, offset, filter }: { limit: number, offset: number, filter: string | null }) {
    const { data, isSuccess,isLoading,status,isError } = useGetCardsQuery({ limit, offset, filter: filter ?? 'newest' }, { skip: limit === 0 });
    const [cards, setCards] = useState<any []>([]);
const {cards:dataCards,total}= data as CardsType&{total:number} || {}
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {

        if (isSuccess && dataCards && hasMore) {
            setCards(prev => {
                const cardMap = new Map(prev.map(card => [card?.yearbook?.id, card]));
               dataCards?.forEach(card => {
                    if (card?.yearbook?.id) {
                        cardMap.set(card.yearbook.id, card);
                    }
                });
                return Array.from(cardMap.values());
            });
            if(cards.length===total){

                setHasMore(false);
            }
        }

    }, [data, isSuccess,hasMore,offset,total,cards.length,dataCards]);

    return { cards, isLoading,isError,hasMore };
}
