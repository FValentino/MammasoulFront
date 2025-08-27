import { CategoriesData } from "../../services/categoryService";
import Card from "../../components/categories/categoryCard"
import BackButton from "../../components/ui/backButton";

export default function Categories() {

  return (
    <section className="container mx-auto p-4">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold">Categorias</h2>
      </div>
      {
        CategoriesData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {CategoriesData.map((category) => (
              <div key={category.id} className="col-span-1">
                <Card id={category.id} name={category.name} image={category.image} />
              </div>
            ))}
          </div>
        ) : (
          <p>No hay categorías disponibles.</p>
        )
      }
    </section>
  )
}   