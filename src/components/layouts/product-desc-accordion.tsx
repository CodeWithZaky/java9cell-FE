import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

const ProductDescAccordion = ({ desc }: { desc: string }) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>deskripsi :</AccordionTrigger>
                <AccordionContent>{desc}</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ProductDescAccordion;
