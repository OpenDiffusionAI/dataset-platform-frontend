import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Checkbox, cn,
    Divider,
    Image,
    Input, Modal,
    ModalContent,
    Tab,
    Tabs,
    Textarea, useDisclosure
} from "@nextui-org/react";
import {CheckIcon, ChevronLeftIcon, StarIcon} from "@heroicons/react/16/solid";
import {useEffect, useRef, useState} from "react";
import {MinusCircleIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

type DescriptionMethod = {
    name: 'Natural language' | 'Booru tags' | string
}

type CustomDescription = {
    method: string
    automated: boolean
    vlmName: string
}

const ImageLabelingEditorView = () => {

    const [rating, setRating] = useState(-1)

    const [nsfwRating, setNsfwRating] = useState(0)
    const [violenceRating, setViolenceRating] = useState(0)
    const [goreRating, setGoreRating] = useState(0)

    const [descriptionMethod, setDescriptionMethod] = useState<string>("")
    const [vlmName, setVlmName] = useState<string>("")
    const [advancedMode, setAdvancedMode] = useState(false)
    const [usingVLM, setUsingVLM] = useState(false)

    const [customDescriptions, setCustomDescriptions] = useState<CustomDescription[]>([])

    const resetAddDescriptionField = () => {
        setDescriptionMethod("")
        // setVlmName("")
        // setUsingVLM(false)
    }

    const addDescriptionField = (descriptionMethod: string, automated: boolean, vlmName: string) => {
        setCustomDescriptions([...customDescriptions, {method: descriptionMethod, automated, vlmName}])

        resetAddDescriptionField()
    }

    const removeDescriptionField = (index: number) => {
        setCustomDescriptions(customDescriptions.filter((_, i) => i !== index))
    }

    // const {isOpen, onOpen, onClose} = useDisclosure();

    // const handleOpen = () => {
    //     onOpen();
    // }

    const canSubmit = true

    return <div className=" flex items-center  flex-col grow">

        <div className=" w-full flex flex-col h-fit grow">

            {/*max-w-screen-lg*/}
            <div className="flex gap-x-8 gap-y-4 px-8 py-8 justify-center">

                <div className="space-y-4 max-w-screen-lg grow w-full">

                    <div className="flex items-center justify-center w-full relative">

                        {/*<Modal backdrop={'opaque'} isOpen={isOpen} onClose={onClose} classNames={{*/}
                        {/*    wrapper: 'max-w-screen w-screen',*/}
                        {/*    base: 'max-w-screen w-screen',*/}
                        {/*    body: 'max-w-screen w-screen'*/}
                        {/*}}>*/}
                        {/*    <ModalContent>*/}
                        {/*        {(onClose) => (*/}
                        {/*            <Image*/}
                        {/*                src="https://picsum.photos/1920/1080" alt="placeholder"*/}
                        {/*                className="w-full h-full object-contain grow"*/}
                        {/*                classNames={{*/}
                        {/*                    wrapper: 'max-w-screen w-screen grow',*/}
                        {/*                    img: 'grow w-screen h-screen object-contain'*/}
                        {/*                }}*/}
                        {/*            />*/}
                        {/*        )}*/}
                        {/*    </ModalContent>*/}
                        {/*</Modal>*/}
                        {/*{*/}

                        {/*isImageFocused &&*/}
                        {/*<Image src="https://picsum.photos/1920/1080" alt="placeholder" className="object-contain w-full max-h-96 cursor-pointer"*/}
                        {/*       onClick={() => setIsImageFocused(wasFocused => !wasFocused)}*/}
                        {/*       classNames={{*/}
                        {/*           wrapper:'max-w-full grow w-full object-cover opacity-0',*/}
                        {/*           img: 'grow'*/}
                        {/*       }}/>*/}
                        {/*}*/}

                        {/*cursor-pointer*/}
                        <Image
                            src="https://picsum.photos/1920/1080" alt="placeholder" className="object-contain w-full max-h-96"
                               // onClick={() => handleOpen()}

                               classNames={{
                            wrapper: /*isImageFocused ? 'fixed z-20 top-0 bottom-0 left-0 right-0 flex items-center justify-center max-w-full w-full' :*/ 'max-w-full grow w-full object-cover',
                            // img: cn('grow', isImageFocused ? 'w-screen ' : 'max-h-96')
                        }}
                        />

                        <div className="flex justify-between absolute bottom-0 w-full z-10 items-end">
                            <Button startContent={<ChevronLeftIcon className="w-4 h-4"/>} variant="flat" className="backdrop-blur"
                                    size="sm">Back</Button>

                            <Button size="sm" endContent={<CheckIcon className="w-4 h-4"/>} variant={canSubmit ? "shadow" : "flat"} className="backdrop-blur"
                                    color={canSubmit ? "primary" : "default"} isDisabled={!canSubmit}>Submit</Button>
                        </div>
                    </div>


                    <div className="flex justify-between">

                        <p className="text-sm font-medium">Descriptions</p>
                        <Checkbox size="sm" onValueChange={setAdvancedMode}>Advanced mode</Checkbox>
                    </div>

                    {
                        advancedMode &&
                        <>
                        <div className="flex justify-between gap-4 rounded-xl flex-wrap">

                            <Autocomplete
                                defaultItems={[{name: 'Natural language'}, {name: 'Booru tags'}]}
                                label="Description method"
                                onValueChange={setDescriptionMethod}
                                onSelectionChange={(item) => {
                                    setDescriptionMethod(item)
                                }}
                                defaultInputValue={descriptionMethod}
                                // placeholder="Natural language, booru tags, etc"
                                className="w-52"
                            >
                                {(item: DescriptionMethod) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
                            </Autocomplete>

                            <div className="inline-flex gap-4 items-center flex-wrap">

                                {/*<Input type={'text'} label={'Description method'} placeholder="Natural language, booru tags, etc" />*/}
                                <Checkbox size="md" onValueChange={setUsingVLM}>Automated</Checkbox>
                                {/*{*/}
                                {/*    usingVLM &&*/}
                                <Input type={'text'} label={'VLM Name'} size="sm" className="w-40" isDisabled={!usingVLM} onValueChange={setVlmName} />
                                {/*}*/}
                                <Button className="shrink-0" size="md" variant="flat" color="primary" radius='full'
                                        startContent={<PlusCircleIcon className="w-6 h-6"/>}
                                        onPress={() => addDescriptionField(descriptionMethod, usingVLM, vlmName)}
                                >Add field</Button>
                            </div>

                        </div>
                        <Divider className="bg-default-200"/>
                    </>
                    }

                    {/*{*/}
                    {/*     !advancedMode &&*/}
                        <Textarea
                            label={advancedMode ? ('Natural language' + " / " + 'Manual') : "Image description"}
                            placeholder={"Describe the image"}
                        />
                    {/*}*/}

                    {
                        customDescriptions.map((customDescription, i) => (

                            <div className="flex gap-4">

                                <Textarea
                                    label={customDescription.method + " / " + (customDescription.automated ? (customDescription.vlmName ?? 'Automated') : 'Manual')}
                                    placeholder={"Describe the image"}
                                />

                                <Button isIconOnly={true} radius={'full'} color={'danger'} variant="flat"
                                onPress={() => removeDescriptionField(i)}>
                                    <MinusCircleIcon className="w-6 h-6"/>
                                </Button>

                            </div>
                        ))
                    }

                    <div className="flex flex-wrap gap-y-4 gap-x-12">
                        <div className="space-y-3">

                            <p className="text-sm font-medium">Quality rating</p>
                            <Tabs aria-label="Tabs variants" onSelectionChange={(key) => setRating(key)} size="sm">
                                <Tab key={-1} title={'Pass'} />
                                <Tab key={0} title={'No stars'}/>
                                {
                                    Array.from({length: 5}).map((_, ratingIndex) => (
                                        <Tab key={ratingIndex + 1} className="px-1.5" title={
                                            <StarIcon key={ratingIndex}
                                                      className={`w-4 h-4 inline leading-none ${ratingIndex < rating ? 'text-yellow-400' : 'text-default-300'}`}/>
                                        }/>
                                    ))
                                }
                            </Tabs>
                        </div>

                        <div className="space-y-3">

                            <p className="text-sm font-medium">Maturity rating</p>
                            <p className="text-sm text-default-600">NSFW</p>
                            <Tabs aria-label="Tabs variants" onSelectionChange={(key) => setNsfwRating(key)} size="sm">

                                <Tab key={0} title={'Not rated'}/>
                                <Tab key={1} title={'Safe'}/>
                                <Tab key={2} title={'Suggestive'}/>
                                <Tab key={3} title={'Explicit'}/>

                            </Tabs>
                            <p className="text-sm text-default-600">Violence</p>
                            <Tabs aria-label="Tabs variants" onSelectionChange={(key) => setViolenceRating(key)} size="sm">

                                <Tab key={0} title={'Not rated'}/>
                                <Tab key={1} title={'None'}/>
                                <Tab key={2} title={'Mild'}/>
                                <Tab key={3} title={'Extreme'}/>

                            </Tabs>
                            <p className="text-sm text-default-600">Gore</p>
                            <Tabs aria-label="Tabs variants" onSelectionChange={(key) => setGoreRating(key)} size="sm">

                                <Tab key={0} title={'Not rated'}/>
                                <Tab key={1} title={'None'}/>
                                <Tab key={2} title={'Mild'}/>
                                <Tab key={3} title={'Extreme'}/>
                            </Tabs>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ImageLabelingEditorView