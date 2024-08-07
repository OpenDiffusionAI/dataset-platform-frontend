import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Link,
    Select,
    SelectItem,
    Textarea,
    Tooltip,
    CheckboxGroup,
    Breadcrumbs,
    BreadcrumbItem, Spacer, cn, Spinner
} from "@nextui-org/react";
import {ArrowUpTrayIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {useDropzone} from "react-dropzone";
import {useCallback, useState} from "react";
import {CheckIcon, InformationCircleIcon} from "@heroicons/react/16/solid";
import numeral from "numeral";
import {CloudArrowUpIcon, HandThumbUpIcon} from "@heroicons/react/24/outline";

const formStages = [
    'Content maturity',
    'Copyright',
    'Additional details'
]

const UploadImagesView = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure({
        onChange(isOpen: boolean | undefined) {

        if (isOpen === false)
            resetForm()

    }});

    const [formStage, setFormStage] = useState(0)

    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [fileUploadProgresses, setFileUploadProgresses] = useState<Record<string, number>>({});

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setAcceptedFiles(prevAcceptedFiles => ([...prevAcceptedFiles, ...acceptedFiles]));
    }, []);

    const {getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

    const [containsNSFW, setContainsNSFW] = useState(false)
    const [containsCopyright, setContainsCopyright] = useState(false)

    const resetForm = () => {
        setAcceptedFiles([])
        setFormStage(0)
        setContainsNSFW(false)
        setContainsCopyright(false)
        setIsSubmitting(false)
        setFileUploadProgresses({})
        setIsSubmitted(false)
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const submit = (onClose: () => void) => {
        setIsSubmitting(true)

        setTimeout(() => {
            // simulate staggered file upload progress

            acceptedFiles.forEach(((file, index) => {
                setTimeout(() => {
                    setFileUploadProgresses(prevProgresses => ({
                        ...prevProgresses,
                        [file.path]: 100
                    }))
                }, 100 * index)
            }))
        }, 100)

        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
        },  2000)
    }

    return (
        <>
            <Button
                className="w-[250px] h-16 flex"
                startContent={<ArrowUpTrayIcon className="w-5 h-5"/>}
                variant="flat"
                color="primary"
                onPress={onOpen}
            >
                <div className="inline-flex flex-col items-start">

                    <p className="font-medium">Upload images</p>
                    <p className="text-tiny">Help dataset reach size goals</p>
                </div>
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className="h-[40rem] max-h-screen overflow-auto"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Upload Image Dataset</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-y-2">
                                <div {...getRootProps()}
                                     className="border-dashed border-primary-200 bg-primary-200/20 rounded-2xl shadow-sm border-2 p-4 text-center text-sm cursor-pointer space-y-3 basis-1/3 inline-flex flex-col justify-center relative">

                                    <div
                                        className={cn("inline-flex flex-col items-center gap-y-1", isDragActive ? 'text-primary' : '')}>

                                        <CloudArrowUpIcon className="w-12 h-12 text-default-500"/>

                                        {
                                            acceptedFiles.length === 0 &&
                                        <><p>Drag and drop</p>

                                        <p className="text-tiny">or</p>

                                        <Link color="primary" className="pointer-events-none" size="sm">
                                            Browse files...
                                        </Link></>
                                        }
                                    </div>

                                    <input {...getInputProps()} />
                                    {/* Display the file names and sizes */}
                                    {
                                        acceptedFiles.length !== 0 &&

                                        <div className="space-y-2 w-full self-center overflow-auto max-h-24">
                                            {acceptedFiles.map(file => (
                                                <div key={file.path} className="line-clamp-1 w-3/4 inline-flex whitespace-nowrap gap-x-4 justify-between">
                                                    <span className="truncate">{file.path}</span>

                                                    <div className="space-x-4 inline-flex items-center">
                                                        <span className="text-default-500 font-medium text-tiny">{numeral(file.size).format("0.0 b")}</span>

                                                        {
                                                            fileUploadProgresses[file.path] !== undefined ?
                                                            <span className="text-default-500 font-medium">{fileUploadProgresses[file.path] == 100 ? <CheckIcon className="w-4 h-4 fill-primary"/> : numeral(fileUploadProgresses[file.path] / 100).format("0.0%")}</span> :
                                                                (isSubmitting ? <Spinner size="sm"/> :
                                                            <span className="hover:text-danger/75 text-danger text-tiny" onClick={
                                                                (e) => {
                                                                e.stopPropagation()
                                                                setAcceptedFiles(prevFiles => prevFiles.filter(f => f !== file))
                                                            }
                                                            }>Remove</span>)
                                                        }

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }

                                    {/*{*/}
                                    {/*    acceptedFiles.length !== 0 &&*/}

                                    {/*    <Button*/}
                                    {/*        isIconOnly={true} variant="flat" color="danger" radius="full" size="sm"*/}
                                    {/*        className="absolute top-2 right-3"*/}
                                    {/*        onClick={() => setAcceptedFiles([])}*/}
                                    {/*    >*/}
                                    {/*        <XMarkIcon className="w-5 h-5"/>*/}
                                    {/*    </Button>*/}
                                    {/*}*/}

                                </div>

                                <p className="text-xs text-default-500">Accepted file types : JPEG, PNG, ZIP, TAR.GZ</p>
                                {/*<p className="text-xs text-default-500">Max 100 MB • Up to 10 files</p>*/}

                            </div>

                            {
                                isSubmitted ?
                                    <div className="inline-flex items-center w-2/3 text-center self-center flex-col py-8 gap-2">
                                        <HandThumbUpIcon className="w-16 h-16 text-primary-400"/>

                                        <p className="font-black text-xl leading-relaxed text-primary-400">Thank you for your submission!</p>

                                    </div> :

                                    <div className="flex-1 shrink-0 flex flex-col gap-3">

                                        <Breadcrumbs size="sm" className="py-1">
                                            <BreadcrumbItem isCurrent={formStage === 0}>Content
                                                maturity</BreadcrumbItem>
                                            <BreadcrumbItem isCurrent={formStage === 1}>Copyright</BreadcrumbItem>
                                            <BreadcrumbItem isCurrent={formStage === 2}>Additional
                                                details</BreadcrumbItem>
                                        </Breadcrumbs>
                                        {
                                            formStage === 0 &&
                                            <>
                                                {/*<p>Content maturity</p>*/}
                                                <Checkbox
                                                    isDisabled={isSubmitting}
                                                    classNames={{
                                                        label: "text-small",
                                                    }}
                                                    isSelected={containsNSFW}
                                                    onValueChange={setContainsNSFW}

                                                >
                                                    Contains NSFW content
                                                </Checkbox>
                                                {containsNSFW &&
                                                    <CheckboxGroup
                                                        classNames={{
                                                            label: "text-small",
                                                        }}
                                                        label="Select all that apply"
                                                        defaultValue={[]}
                                                        isDisabled={!containsNSFW}
                                                        size="sm"
                                                    >
                                                        <Checkbox value="buenos-aires">Sexual content</Checkbox>
                                                        <Checkbox value="sydney">Violent content</Checkbox>
                                                        <Checkbox value="san-francisco">Gore and horrific
                                                            depictions</Checkbox>
                                                    </CheckboxGroup>
                                                }
                                            </>
                                        }
                                        {
                                            formStage === 1 &&
                                            <>
                                                {/*<p>Copyright</p>*/}
                                                <Checkbox
                                                    isDisabled={isSubmitting}
                                                    isSelected={containsCopyright}
                                                    onValueChange={setContainsCopyright}
                                                    classNames={{
                                                        label: "text-small",
                                                    }}
                                                >
                                                    Contains copyright license information
                                                </Checkbox>
                                                <Tooltip content={<div className="px-1 py-2">
                                                    <div className="text-small font-bold">Learn more</div>
                                                    <Link target="_blank"
                                                          href="https://choosealicense.com/non-software/">
                                                        <div className="text-tiny">choosealicense.com</div>
                                                    </Link>
                                                </div>}>
                                                    <p className="inline-flex w-fit gap-x-3 items-center text-sm text-primary-400 cursor-pointer">
                                                        <InformationCircleIcon className="w-4 h-4"/>How do I know?</p>
                                                </Tooltip>
                                                {
                                                    containsCopyright &&

                                                    <Select placeholder="Select license type"
                                                            isDisabled={!containsCopyright}>
                                                        <SelectItem key="CC0-1.0" value="CC0-1.0">CC0-1.0</SelectItem>
                                                        <SelectItem key="CC-BY-4.0"
                                                                    value="CC-BY-4.0">CC-BY-4.0</SelectItem>
                                                        <SelectItem key="CC-BY-SA-4.0"
                                                                    value="CC-BY-SA-4.0">CC-BY-SA-4.0</SelectItem>
                                                    </Select>
                                                }</>
                                        }
                                        {
                                            formStage === 2 &&

                                            <>
                                                {/*<p>Additional details</p>*/}
                                                <Textarea
                                                    isDisabled={isSubmitting}
                                                    label="Dataset content"
                                                    placeholder="Describe the contents of your dataset in detail to the fullest of your knowledge..."
                                                />
                                                <Textarea
                                                    isDisabled={isSubmitting}
                                                    label="Dataset provenance"
                                                    placeholder="Explain where the content is sourced to the fullest of your knowledge..."
                                                />
                                            </>
                                        }
                                    </div>
                            }
                        </ModalBody>
                            <ModalFooter>

                                <Button variant="flat" onPress={onClose} className="self-start">
                                    Back
                                </Button>

                                <Spacer className="grow"/>
                                {
                                    formStage > 0 &&
                                    <Button variant="flat" onPress={() => setFormStage(formStage - 1)}>
                                        Previous
                                    </Button>
                                }
                                {
                                    formStage < formStages.length - 1 &&
                                    <Button color="primary" variant="flat" onPress={() => setFormStage(formStage + 1)}>
                                        Next
                                    </Button>

                                }
                                {
                                    (formStage === formStages.length - 1 && !isSubmitted) &&
                                    <Button color="primary" isDisabled={acceptedFiles.length === 0} isLoading={isSubmitting} onPress={() => submit(onClose)}>
                                        Submit
                                    </Button>

                                }
                                {
                                    (formStage === formStages.length - 1 && isSubmitted) &&
                                    <Button color="primary" onPress={onClose}>
                                        Done
                                    </Button>

                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default UploadImagesView