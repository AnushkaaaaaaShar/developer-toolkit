"use client"

import { useState } from "react";
import { generateMultipleParagraphs, generateParagraph, generateSentence } from "../../utils/lorem-ipsum/generators";
import { buttonStyles, HeadingStyles } from "@/styles/styles";
import BackToHome from "@/components/BackToHome";
import Footer from "@/components/Footer";
import { AlignLeft, AlignCenter, AlignRight, Smartphone } from "lucide-react";

export default function Page(){

    const [loremIpsum, setLoremIpsum] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    const [textToCopy, setTextToCopy] = useState("");
    const [sentenceCount, setSentenceCount] = useState(4);
    const [avgSentenceLength, setAvgSentenceLength] = useState(10);
    const [paragraphCount, setParagraphCount] = useState(2);
    const [textAlignment, setTextAlignment] = useState<"left" | "right" | "center">("left");
    const [isCopied, setIsCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    function manageMultipleParagraphs(sentenceCount: number, avgSentenceLength: number, paragraphCount: number): string {
        const paragraphs = generateMultipleParagraphs(sentenceCount, avgSentenceLength, paragraphCount);
        setLoremIpsum(paragraphs.join("<br/>"));
        setTextToCopy(paragraphs.join("\n\n"));

        return paragraphs.join("<br/>");
    }

    function handleCopy(){
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Text copied to clipboard");
                setIsCopied(true);
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
                setIsCopied(false);
            });
            setTimeout(() => {
                setIsCopied(false);
            }, 1000)
    }

    return (
        <div className="flex flex-col justify-between items-center gap-8 bg-white min-h-screen px-8 pt-4 pb-2">
            <div className="flex flex-col items-center">    
                <div className="flex flex-col max-w-md mx-auto p-6 bg-white text-black gap-3">
                    <BackToHome className="mb-12"/>
                    <h2 className={`${HeadingStyles.h2} w-fit mx-auto`}>Lorem Ipsum</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="sentenceCount"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Avg. Sentence Length:
                            </label>
                            <div className="w-full flex flex-row gap-2 items-center">
                                <input type="range" min={1} max={20} value={avgSentenceLength} 
                                    onChange={(e) => setAvgSentenceLength(Number(e.target.value))}
                                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <input type="number" min={1} max={20} value={avgSentenceLength} 
                                    onChange={(e) => setAvgSentenceLength(Number(e.target.value))}
                                    className="w-12 text-center px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-200 no-spinner" 
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="sentenceCount"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Sentence Count:
                            </label>
                            <div className="w-full flex flex-row gap-2 items-center">
                                <input type="range" min={1} max={20} value={sentenceCount} 
                                    onChange={(e) => setSentenceCount(Number(e.target.value))}
                                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <input type="number" min={1} max={20} value={sentenceCount} 
                                    onChange={(e) => setSentenceCount(Number(e.target.value))}
                                    className="w-12 text-center px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-200 no-spinner" 
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="sentenceCount"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Paragraph Count:
                            </label>
                            <div className="w-full flex flex-row gap-2 items-center">
                                <input type="range" min={1} max={20} value={paragraphCount} 
                                    onChange={(e) => setParagraphCount(Number(e.target.value))}
                                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <input type="number" min={1} max={20} value={paragraphCount} 
                                    onChange={(e) => setParagraphCount(Number(e.target.value))}
                                    className="w-12 text-center px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-200 no-spinner" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-wrap">
                        <h2 className="text-xl font-semibold text-gray-800">Generate:</h2>
                        <div className="flex gap-3">
                            <button className={`flex-1 ${buttonStyles.medium} ${buttonStyles.primary}`} 
                                    onClick={() => {
                                        setLoremIpsum(generateSentence(avgSentenceLength))
                                        setTextToCopy(loremIpsum)
                                    }}>
                                        Sentence
                            </button>
                            <button className={`flex-1 ${buttonStyles.medium} ${buttonStyles.primary}`}  
                                    onClick={() => {
                                        setLoremIpsum(generateParagraph(sentenceCount, avgSentenceLength))
                                        setTextToCopy(loremIpsum)
                                        }}>
                                            Paragraph
                            </button>
                            <button className={`flex-1 ${buttonStyles.medium} ${buttonStyles.primary}`}  
                            onClick={() => setLoremIpsum(manageMultipleParagraphs(avgSentenceLength, sentenceCount, paragraphCount))}>Paragraphs</button>
                        </div>
                    </div>

                    <hr className="border-neutral-200"/>
                    
                    <div className="flex w-full justify-between">
                        <div className="flex">
                            <button onClick={() => setTextAlignment("left")} className={`${ textAlignment === "left" ? "bg-neutral-200/80 hover:bg-neutral-300/70" : "bg-white hover:bg-neutral-100"} px-0.5 py-0.5 rounded-md  transition-colors duration-100 ease`}>
                                <AlignLeft className="size-7"/>
                            </button>
                            <button onClick={() => setTextAlignment("center")}  className={`${ textAlignment === "center" ? "bg-neutral-200/80 hover:bg-neutral-300/70" : "bg-white hover:bg-neutral-100"} px-0.5 py-0.5 rounded-md transition-colors duration-100 ease`}>
                                <AlignCenter className="size-7"/>
                            </button>
                            <button onClick={() => setTextAlignment("right")} className={`${ textAlignment === "right" ? "bg-neutral-200/80 hover:bg-neutral-300/70" : "bg-white hover:bg-neutral-100"} px-0.5 py-0.5 rounded-md transition-colors duration-100 ease`}>
                                <AlignRight className="size-7"/>
                            </button>
                        </div>

                        <button className={`${ isMobile ? "bg-neutral-200/80 hover:bg-neutral-300/70" : "bg-white hover:bg-neutral-100"} px-1 py-0.5 rounded-md transition-colors duration-100 ease`}
                                onClick={() => setIsMobile(!isMobile)}>
                            <Smartphone className="size-7"/>
                        </button>
                    </div>

                </div>
                <div className="flex flex-col">
                    <p className={`${ isCopied ? "text-green-700" : "text-white"} ml-auto px-3`}>Copied</p>
                    <button dangerouslySetInnerHTML={{__html: loremIpsum}}
                    onClick={handleCopy}
                    className={`px-4 py-3 text-wrap bg-white border-2 border-neutral-200 rounded-md text-black`}
                    style={{ textAlign: textAlignment,
                        maxWidth: isMobile ? "36ch" : "672px",
                    }}
                    />
                </div>
            </div>

            <Footer/>
        </div>
    )
}
