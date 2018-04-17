import os, os.path
from whoosh import index
from whoosh.fields import Schema, TEXT, KEYWORD, ID, STORED
from whoosh.analysis import StemmingAnalyzer
from whoosh.qparser import QueryParser, MultifieldParser
import whoosh.index as index

def create_schema():
    schema = Schema(docid=ID(stored=True),
                title=TEXT(stored=True, analyzer=StemmingAnalyzer()),
                abstract=TEXT(stored=True, analyzer=StemmingAnalyzer()))
    return schema

def add_pdf(docid, title, abstract):
    ix = index.open_dir("indexdir")
    writer = ix.writer()
    writer.add_document(docid=docid, title=title, abstract=abstract)
    writer.commit()

def search(query, type1, type2):
    # ix = index.open_dir("indexdir")
    try:
        searcher = ix.searcher()
        searcher = searcher.refresh()
    finally:
        searcher.close()
    qp = MultifieldParser([type1,type2], schema=ix.schema)
    q = qp.parse(query)

    s= ix.searcher()
    results = s.search(q)
    result_docids=[]
    if results:
        for hit in results:
            # result_docids.append(hit['docid'])
            print("DOCID: ", hit['docid'])
            print("Title: ", hit['title'])
            print(hit['abstract'])
            print("---------------------")
        # print(results)
        return result_docids
    else:
        return None


schema = create_schema()
if not os.path.exists("indexdir"):
    os.mkdir("indexdir")
    static_index()

ix = index.create_in("indexdir", schema)
add_pdf("1","COMPACT NEURAL NETWORKS BASED ON THE MULTISCALE ENTANGLEMENT RENORMALIZATION ANSATZ","This paper demonstrates a method for tensorizing neural networks based upon an efficient way of approximating scale invariant quantum states, the Multi-scale Entanglement Renormalization Ansatz (MERA). We employ MERA as a replace- ment for the fully connected layers in a convolutional neural network and test this implementation on the CIFAR-10 and CIFAR-100 datasets. The proposed method outperforms factorization using tensor trains, providing greater compression for the same level of accuracy and greater accuracy for the same level of compres- sion. We demonstrate MERA layers with 14000 times fewer parameters and a reduction in accuracy of less than 1 compared to the equivalent fully connected layers, scaling like O(N).")
add_pdf("2","Weakly Supervised Action Localization by Sparse Temporal Pooling Network","We propose a weakly supervised temporal action local- ization algorithm on untrimmed videos using convolutional neural networks. Our algorithm learns from video-level class labels and predicts temporal intervals of human ac- tions with no requirement of temporal localization annota- tions. We design our network to identify a sparse subset of key segments associated with target actions in a video us- ing an attention module and fuse the key segments through adaptive temporal pooling. Our loss function is comprised of two terms that minimize the video-level action classifica- tion error and enforce the sparsity of the segment selection. At inference time, we extract and score temporal proposals using temporal class activations and class-agnostic atten- tions to estimate the time intervals that correspond to tar- get actions. The proposed algorithm attains state-of-the-art results on the THUMOS14 dataset and outstanding perfor- mance on ActivityNet1.3 even with its weak supervision.")
add_pdf("3","A Robust Real-Time Automatic License Plate Recognition based on the YOLO Detector","Automatic License Plate Recognition (ALPR) has been a frequent topic of research due to many practical ap- plications. However, many of the current solutions are still not robust in real-world situations, commonly depending on many constraints. This paper presents a robust and efficient ALPR system based on the state-of-the-art YOLO object detector. The Convolutional Neural Networks (CNNs) are trained and fine- tuned for each ALPR stage so that they are robust under different conditions (e.g., variations in camera, lighting, and background). Specially for character segmentation and recognition, we design a two-stage approach employing simple data augmentation tricks such as inverted License Plates (LPs) and flipped characters. The resulting ALPR approach achieved impressive results in two datasets. First, in the SSIG dataset, composed of 2,000 frames from 101 vehicle videos, our system achieved a recognition rate of 93.53 and 47 Frames Per Second (FPS), performing better than both Sighthound and OpenALPR commercial systems (89.80 and 93.03%, respectively) and considerably outperform- ing previous results (81.80%). Second, targeting a more realistic scenario, we introduce a larger public dataset1, called UFPR- ALPR dataset, designed to ALPR. This dataset contains 150 videos and 4,500 frames captured when both camera and vehicles are moving and also contains different types of vehicles (cars, motorcycles, buses and trucks). In our proposed dataset, the trial versions of commercial systems achieved recognition rates below 70%. On the other hand, our system performed better, with recognition rate of 78.33 and 35 FPS.")
while True:
    query= input()
    result = search(query,"title","abstract")
    # print(result)





